import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export const fetchTrips = createAsyncThunk(
  "trips/fetchTrips",
  async (uid) => {
    try {
      const docRef = doc(db, "trips", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().trips;
      } else {
        return [];
      }
    } catch (e) {
      console.error("Error fetching doc: ", e);
    }
  }
);

export const addTrip = createAsyncThunk(
  "trips/addTrip",
  async ({uid, trip}) => {
    try {
      const docRef = doc(db, "trips", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const trips = docSnap.data().trips;
        trips.push(trip);
        await setDoc(docRef, { trips });
        return trips;
      } else {
        await setDoc(docRef, { trips: [trip] });
        return [trip];
      }
    } catch (e) {
      console.error("Error adding to doc: ", e);
    }
  }
);

export const removeTrip = createAsyncThunk(
  "trips/removeTrip",
  async ({uid, tripId}) => {
    try {
      const docRef = doc(db, "trips", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const trips = docSnap.data().trips;
        const newTrips = trips.filter((trip) => trip.id !== tripId);
        await setDoc(docRef, { trips: newTrips });
        return newTrips;
      }
    } catch (e) {
      console.error("Error removing from doc: ", e);
    }
  }
);

export const updateTrip = createAsyncThunk(
  "trips/updateTrip",
  async ({uid, tripId, trip}) => {
    try {
      const docRef = doc(db, "trips", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const trips = docSnap.data().trips;
        const newTrips = trips.map((trip) => {
          if (trip.id === tripId) {
            return trip;
          } else {
            return trip;
          }
        });
        await setDoc(docRef, { trips: newTrips });
        return newTrips;
      }
    } catch (e) {
      console.error("Error updating doc: ", e);
    }
  }
);