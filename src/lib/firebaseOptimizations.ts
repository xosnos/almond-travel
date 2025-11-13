/**
 * Firebase Optimization Utilities
 *
 * This module provides optimized Firebase operations including:
 * - Query result caching with TTL
 * - Automatic retry logic with exponential backoff
 * - Request batching and deduplication
 * - Error handling and logging
 */

import {
  getDoc,
  setDoc,
  updateDoc,
  DocumentReference,
  DocumentData,
  FirestoreError,
} from 'firebase/firestore';

// Cache interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Cache storage
const cache = new Map<string, CacheEntry<any>>();

// Default cache TTL (5 minutes)
const DEFAULT_CACHE_TTL = 5 * 60 * 1000;

// Default retry configuration
const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_RETRY_DELAY = 1000; // 1 second

/**
 * Get cached data if available and not expired
 */
function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  const now = Date.now();
  if (now - entry.timestamp > entry.ttl) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

/**
 * Set data in cache with TTL
 */
function setCache<T>(key: string, data: T, ttl: number = DEFAULT_CACHE_TTL): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
}

/**
 * Clear cached data for a specific key or all cache
 */
export function clearCache(key?: string): void {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}

/**
 * Sleep utility for retry logic
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Calculate exponential backoff delay
 */
function getBackoffDelay(attempt: number, baseDelay: number = DEFAULT_RETRY_DELAY): number {
  return baseDelay * Math.pow(2, attempt);
}

/**
 * Check if error is retryable
 */
function isRetryableError(error: FirestoreError): boolean {
  const retryableCodes = [
    'unavailable',
    'deadline-exceeded',
    'resource-exhausted',
    'internal',
    'unknown',
  ];
  return retryableCodes.includes(error.code);
}

/**
 * Execute a function with retry logic
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = DEFAULT_MAX_RETRIES,
  onRetry?: (attempt: number, error: Error) => void
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Don't retry if it's not a retryable error
      if (error instanceof Error && 'code' in error) {
        const firestoreError = error as FirestoreError;
        if (!isRetryableError(firestoreError)) {
          throw error;
        }
      }

      // Don't retry if this was the last attempt
      if (attempt === maxRetries) {
        break;
      }

      // Call retry callback if provided
      if (onRetry) {
        onRetry(attempt + 1, lastError);
      }

      // Wait before retrying with exponential backoff
      const delay = getBackoffDelay(attempt);
      await sleep(delay);
    }
  }

  throw lastError!;
}

/**
 * Optimized document fetching with caching and retry
 */
export async function fetchDocumentOptimized<T = DocumentData>(
  docRef: DocumentReference,
  options: {
    useCache?: boolean;
    cacheTTL?: number;
    maxRetries?: number;
    onRetry?: (attempt: number, error: Error) => void;
  } = {}
): Promise<T | null> {
  const {
    useCache = true,
    cacheTTL = DEFAULT_CACHE_TTL,
    maxRetries = DEFAULT_MAX_RETRIES,
    onRetry,
  } = options;

  const cacheKey = docRef.path;

  // Check cache first
  if (useCache) {
    const cached = getCached<T>(cacheKey);
    if (cached !== null) {
      return cached;
    }
  }

  // Fetch with retry logic
  try {
    const result = await withRetry(
      async () => {
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          return null;
        }
        return docSnap.data() as T;
      },
      maxRetries,
      onRetry
    );

    // Cache the result
    if (result !== null && useCache) {
      setCache(cacheKey, result, cacheTTL);
    }

    return result;
  } catch (error) {
    console.error(`Error fetching document ${docRef.path}:`, error);
    throw error;
  }
}

/**
 * Optimized document update with retry
 */
export async function updateDocumentOptimized(
  docRef: DocumentReference,
  data: Partial<DocumentData>,
  options: {
    maxRetries?: number;
    invalidateCache?: boolean;
    onRetry?: (attempt: number, error: Error) => void;
  } = {}
): Promise<void> {
  const {
    maxRetries = DEFAULT_MAX_RETRIES,
    invalidateCache = true,
    onRetry,
  } = options;

  try {
    await withRetry(
      async () => await updateDoc(docRef, data),
      maxRetries,
      onRetry
    );

    // Invalidate cache after successful update
    if (invalidateCache) {
      clearCache(docRef.path);
    }
  } catch (error) {
    console.error(`Error updating document ${docRef.path}:`, error);
    throw error;
  }
}

/**
 * Optimized document set with retry
 */
export async function setDocumentOptimized(
  docRef: DocumentReference,
  data: DocumentData,
  options: {
    maxRetries?: number;
    invalidateCache?: boolean;
    onRetry?: (attempt: number, error: Error) => void;
  } = {}
): Promise<void> {
  const {
    maxRetries = DEFAULT_MAX_RETRIES,
    invalidateCache = true,
    onRetry,
  } = options;

  try {
    await withRetry(
      async () => await setDoc(docRef, data),
      maxRetries,
      onRetry
    );

    // Invalidate cache after successful set
    if (invalidateCache) {
      clearCache(docRef.path);
    }
  } catch (error) {
    console.error(`Error setting document ${docRef.path}:`, error);
    throw error;
  }
}

/**
 * Batch multiple document fetches
 */
export async function batchFetchDocuments<T = DocumentData>(
  docRefs: DocumentReference[],
  options: {
    useCache?: boolean;
    cacheTTL?: number;
    maxRetries?: number;
  } = {}
): Promise<(T | null)[]> {
  return Promise.all(
    docRefs.map(docRef => fetchDocumentOptimized<T>(docRef, options))
  );
}

/**
 * Request deduplication map
 * Prevents multiple simultaneous requests for the same resource
 */
const pendingRequests = new Map<string, Promise<any>>();

/**
 * Execute a request with deduplication
 * If the same request is already in progress, return the existing promise
 */
export async function withDeduplication<T>(
  key: string,
  fn: () => Promise<T>
): Promise<T> {
  // Check if request is already in progress
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key)!;
  }

  // Execute the request
  const promise = fn().finally(() => {
    // Remove from pending requests when done
    pendingRequests.delete(key);
  });

  // Store in pending requests
  pendingRequests.set(key, promise);

  return promise;
}

/**
 * Performance monitoring wrapper
 */
export async function withPerformanceMonitoring<T>(
  operationName: string,
  fn: () => Promise<T>
): Promise<T> {
  const startTime = performance.now();

  try {
    const result = await fn();
    const duration = performance.now() - startTime;

    if (duration > 1000) {
      console.warn(`Slow Firebase operation: ${operationName} took ${duration.toFixed(2)}ms`);
    }

    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    console.error(`Firebase operation failed: ${operationName} (${duration.toFixed(2)}ms)`, error);
    throw error;
  }
}
