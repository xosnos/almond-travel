import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export const fetchForums = createAsyncThunk(
  "forums/fetchForums",
  async (state) => {
    try {
      const docRef = doc(db, "forums", state);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().forums;
      } else {
        return [];
      }
    } catch (e) {
      console.error("Error fetching doc: ", e);
    }
  }
);

export const addForum = createAsyncThunk(
  "forums/addForum",
  async ({state, forum}) => {
    try {
      const docRef = doc(db, "forums", state);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const forums = docSnap.data().forums;
        forums.push(forum);
        await setDoc(docRef, { forums });
        return forums;
      } else {
        await setDoc(docRef, { forums: [forum] });
        return [forum];
      }
    } catch (e) {
      console.error("Error adding to doc: ", e);
    }
  }
);

export const removeForum = createAsyncThunk(
  "forums/removeForum",
  async ({state, index}) => {
    try {
      const docRef = doc(db, "forums", state);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const forums = docSnap.data().forums;
        const newForums = forums.filter((forum, i) => i !== index);
        await setDoc(docRef, { forums: newForums });
        return newForums;
      }
    } catch (e) {
      console.error("Error removing from doc: ", e);
    }
  }
);