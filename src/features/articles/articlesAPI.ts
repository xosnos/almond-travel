import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Article } from "../../types";
import {
  fetchDocumentOptimized,
  withPerformanceMonitoring,
  withDeduplication,
  clearCache,
} from "../../lib/firebaseOptimizations";

interface ArticlesDocument {
  articles: Article[];
}

/**
 * Fetch articles with caching and retry logic
 * Articles are typically static content, so we use longer cache TTL
 */
export const fetchArticles = createAsyncThunk<Article[], string>(
  "articles/fetchArticles",
  async (category, { rejectWithValue }) => {
    try {
      return await withPerformanceMonitoring(
        `fetchArticles-${category}`,
        async () => {
          return await withDeduplication(
            `articles-${category}`,
            async () => {
              const docRef = doc(db, 'articles', category);

              const result = await fetchDocumentOptimized<ArticlesDocument>(docRef, {
                useCache: true,
                cacheTTL: 10 * 60 * 1000, // 10 minutes (articles are relatively static)
                maxRetries: 3,
                onRetry: (attempt, error) => {
                  console.warn(`Retrying fetchArticles (attempt ${attempt}):`, error.message);
                },
              });

              if (result && result.articles) {
                return result.articles;
              }
              return [];
            }
          );
        }
      );
    } catch (error) {
      console.error("Error fetching articles: ", error);
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Utility function to clear articles cache manually
 */
export const clearArticlesCache = (category: string): void => {
  const docRef = doc(db, 'articles', category);
  clearCache(docRef.path);
};
