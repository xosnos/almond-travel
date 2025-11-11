import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Trip } from "../../types";
import {
  fetchDocumentOptimized,
  setDocumentOptimized,
  withPerformanceMonitoring,
  withDeduplication,
  clearCache,
} from "../../lib/firebaseOptimizations";

interface AddTripParams {
  uid: string;
  trip: Trip;
}

interface RemoveTripParams {
  uid: string;
  index: number;
}

interface UpdateTripParams {
  uid: string;
  tripIndex: number;
  trip: Trip;
}

interface TripsDocument {
  trips: Trip[];
}

/**
 * Fetch trips with caching and retry logic
 */
export const fetchTrips = createAsyncThunk<Trip[], string>(
  "trips/fetchTrips",
  async (uid, { rejectWithValue }) => {
    try {
      return await withPerformanceMonitoring(
        `fetchTrips-${uid}`,
        async () => {
          return await withDeduplication(
            `trips-${uid}`,
            async () => {
              const docRef = doc(db, "trips", uid);

              const result = await fetchDocumentOptimized<TripsDocument>(docRef, {
                useCache: true,
                cacheTTL: 5 * 60 * 1000, // 5 minutes
                maxRetries: 3,
                onRetry: (attempt, error) => {
                  console.warn(`Retrying fetchTrips (attempt ${attempt}):`, error.message);
                },
              });

              if (result && result.trips) {
                return result.trips;
              }
              return [];
            }
          );
        }
      );
    } catch (e) {
      console.error("Error fetching trips: ", e);
      return rejectWithValue((e as Error).message);
    }
  }
);

/**
 * Add trip with optimized error handling and cache invalidation
 */
export const addTrip = createAsyncThunk<Trip[], AddTripParams>(
  "trips/addTrip",
  async ({ uid, trip }, { rejectWithValue }) => {
    try {
      return await withPerformanceMonitoring(
        `addTrip-${uid}`,
        async () => {
          const docRef = doc(db, "trips", uid);
          const docSnap = await getDoc(docRef);

          let trips: Trip[];
          if (docSnap.exists()) {
            trips = (docSnap.data().trips as Trip[]) || [];
            trips.push(trip);
          } else {
            trips = [trip];
          }

          await setDocumentOptimized(docRef, { trips }, {
            maxRetries: 3,
            invalidateCache: true,
            onRetry: (attempt, error) => {
              console.warn(`Retrying addTrip (attempt ${attempt}):`, error.message);
            },
          });

          return trips;
        }
      );
    } catch (e) {
      console.error("Error adding trip: ", e);
      return rejectWithValue((e as Error).message);
    }
  }
);

/**
 * Remove trip with optimized error handling and cache invalidation
 */
export const removeTrip = createAsyncThunk<Trip[], RemoveTripParams>(
  "trips/removeTrip",
  async ({ uid, index }, { rejectWithValue }) => {
    try {
      return await withPerformanceMonitoring(
        `removeTrip-${uid}`,
        async () => {
          const docRef = doc(db, "trips", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const trips = (docSnap.data().trips as Trip[]) || [];
            const newTrips = trips.filter((_, i) => i !== index);

            await setDocumentOptimized(docRef, { trips: newTrips }, {
              maxRetries: 3,
              invalidateCache: true,
              onRetry: (attempt, error) => {
                console.warn(`Retrying removeTrip (attempt ${attempt}):`, error.message);
              },
            });

            return newTrips;
          }
          return [];
        }
      );
    } catch (e) {
      console.error("Error removing trip: ", e);
      return rejectWithValue((e as Error).message);
    }
  }
);

/**
 * Update trip with optimized error handling and cache invalidation
 */
export const updateTrip = createAsyncThunk<Trip[], UpdateTripParams>(
  "trips/updateTrip",
  async ({ uid, tripIndex, trip }, { rejectWithValue }) => {
    try {
      return await withPerformanceMonitoring(
        `updateTrip-${uid}`,
        async () => {
          const docRef = doc(db, "trips", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const trips = (docSnap.data().trips as Trip[]) || [];
            const newTrips = trips.map((t, i) => (i === tripIndex ? trip : t));

            await setDocumentOptimized(docRef, { trips: newTrips }, {
              maxRetries: 3,
              invalidateCache: true,
              onRetry: (attempt, error) => {
                console.warn(`Retrying updateTrip (attempt ${attempt}):`, error.message);
              },
            });

            return newTrips;
          }
          return [];
        }
      );
    } catch (e) {
      console.error("Error updating trip: ", e);
      return rejectWithValue((e as Error).message);
    }
  }
);

/**
 * Utility function to clear trips cache manually
 */
export const clearTripsCache = (uid: string): void => {
  const docRef = doc(db, "trips", uid);
  clearCache(docRef.path);
};
