import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Trip } from "../../types";

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

export const fetchTrips = createAsyncThunk<Trip[], string>(
  "trips/fetchTrips",
  async (uid) => {
    try {
      const docRef = doc(db, "trips", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().trips as Trip[];
      } else {
        return [];
      }
    } catch (e) {
      console.error("Error fetching doc: ", e);
      throw e;
    }
  }
);

export const addTrip = createAsyncThunk<Trip[], AddTripParams>(
  "trips/addTrip",
  async ({ uid, trip }) => {
    try {
      const docRef = doc(db, "trips", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const trips = docSnap.data().trips as Trip[];
        trips.push(trip);
        await setDoc(docRef, { trips });
        return trips;
      } else {
        await setDoc(docRef, { trips: [trip] });
        return [trip];
      }
    } catch (e) {
      console.error("Error adding to doc: ", e);
      throw e;
    }
  }
);

export const removeTrip = createAsyncThunk<Trip[], RemoveTripParams>(
  "trips/removeTrip",
  async ({ uid, index }) => {
    try {
      const docRef = doc(db, "trips", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const trips = docSnap.data().trips as Trip[];
        const newTrips = trips.filter((_, i) => i !== index);
        await setDoc(docRef, { trips: newTrips });
        return newTrips;
      }
      return [];
    } catch (e) {
      console.error("Error removing from doc: ", e);
      throw e;
    }
  }
);

export const updateTrip = createAsyncThunk<Trip[], UpdateTripParams>(
  "trips/updateTrip",
  async ({ uid, tripIndex, trip }) => {
    try {
      const docRef = doc(db, "trips", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const trips = docSnap.data().trips as Trip[];
        const newTrips = trips.map((t, i) => (i === tripIndex ? trip : t));
        await setDoc(docRef, { trips: newTrips });
        return newTrips;
      }
      return [];
    } catch (e) {
      console.error("Error updating doc: ", e);
      throw e;
    }
  }
);
