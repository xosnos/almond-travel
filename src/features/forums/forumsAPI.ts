import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Forum, ForumResponse } from "../../types";
import {
  fetchDocumentOptimized,
  setDocumentOptimized,
  withPerformanceMonitoring,
  withDeduplication,
  clearCache,
} from "../../lib/firebaseOptimizations";

interface AddForumParams {
  state: string;
  forum: Forum;
}

interface AddResponseParams {
  state: string;
  index: number;
  response: ForumResponse;
}

interface RemoveForumParams {
  state: string;
  index: number;
}

interface ForumsDocument {
  forums: Forum[];
}

/**
 * Fetch forums with caching and retry logic
 */
export const fetchForums = createAsyncThunk<Forum[], string>(
  "forums/fetchForums",
  async (state, { rejectWithValue }) => {
    try {
      return await withPerformanceMonitoring(
        `fetchForums-${state}`,
        async () => {
          return await withDeduplication(
            `forums-${state}`,
            async () => {
              const docRef = doc(db, "forums", state);

              const result = await fetchDocumentOptimized<ForumsDocument>(docRef, {
                useCache: true,
                cacheTTL: 2 * 60 * 1000, // 2 minutes (forums update more frequently)
                maxRetries: 3,
                onRetry: (attempt, error) => {
                  console.warn(`Retrying fetchForums (attempt ${attempt}):`, error.message);
                },
              });

              if (result && result.forums) {
                return result.forums;
              }
              return [];
            }
          );
        }
      );
    } catch (e) {
      console.error("Error fetching forums: ", e);
      return rejectWithValue((e as Error).message);
    }
  }
);

/**
 * Add forum with optimized error handling and cache invalidation
 */
export const addForum = createAsyncThunk<Forum[], AddForumParams>(
  "forums/addForum",
  async ({ state, forum }, { rejectWithValue }) => {
    try {
      return await withPerformanceMonitoring(
        `addForum-${state}`,
        async () => {
          const docRef = doc(db, "forums", state);
          const docSnap = await getDoc(docRef);

          let forums: Forum[];
          if (docSnap.exists()) {
            forums = (docSnap.data().forums as Forum[]) || [];
            forums = [forum, ...forums]; // Add to beginning
          } else {
            forums = [forum];
          }

          await setDocumentOptimized(docRef, { forums }, {
            maxRetries: 3,
            invalidateCache: true,
            onRetry: (attempt, error) => {
              console.warn(`Retrying addForum (attempt ${attempt}):`, error.message);
            },
          });

          return forums;
        }
      );
    } catch (e) {
      console.error("Error adding forum: ", e);
      return rejectWithValue((e as Error).message);
    }
  }
);

/**
 * Add response to forum with optimized error handling
 */
export const addResponse = createAsyncThunk<Forum[], AddResponseParams>(
  "forums/addResponse",
  async ({ state, index, response }, { rejectWithValue }) => {
    try {
      return await withPerformanceMonitoring(
        `addResponse-${state}-${index}`,
        async () => {
          const docRef = doc(db, "forums", state);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const forums = (docSnap.data().forums as Forum[]) || [];
            const newForum = { ...forums[index] };
            newForum.responses = [...newForum.responses, response];

            const newForums = forums.map((forum, i) => {
              if (i === index) {
                return newForum;
              }
              return forum;
            });

            await setDocumentOptimized(docRef, { forums: newForums }, {
              maxRetries: 3,
              invalidateCache: true,
              onRetry: (attempt, error) => {
                console.warn(`Retrying addResponse (attempt ${attempt}):`, error.message);
              },
            });

            return newForums;
          }
          return [];
        }
      );
    } catch (e) {
      console.error("Error adding response: ", e);
      return rejectWithValue((e as Error).message);
    }
  }
);

/**
 * Remove forum with optimized error handling and cache invalidation
 */
export const removeForum = createAsyncThunk<Forum[], RemoveForumParams>(
  "forums/removeForum",
  async ({ state, index }, { rejectWithValue }) => {
    try {
      return await withPerformanceMonitoring(
        `removeForum-${state}`,
        async () => {
          const docRef = doc(db, "forums", state);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const forums = (docSnap.data().forums as Forum[]) || [];
            const newForums = forums.filter((_, i) => i !== index);

            await setDocumentOptimized(docRef, { forums: newForums }, {
              maxRetries: 3,
              invalidateCache: true,
              onRetry: (attempt, error) => {
                console.warn(`Retrying removeForum (attempt ${attempt}):`, error.message);
              },
            });

            return newForums;
          }
          return [];
        }
      );
    } catch (e) {
      console.error("Error removing forum: ", e);
      return rejectWithValue((e as Error).message);
    }
  }
);

/**
 * Utility function to clear forums cache manually
 */
export const clearForumsCache = (state: string): void => {
  const docRef = doc(db, "forums", state);
  clearCache(docRef.path);
};
