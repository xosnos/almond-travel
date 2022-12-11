import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

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
      } else {
        await setDoc(docRef, { trips: [trip] });
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
      }
    } catch (e) {
      console.error("Error removing from doc: ", e);
    }
  }
);