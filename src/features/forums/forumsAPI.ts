import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Forum, ForumResponse } from "../../types";

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

export const fetchForums = createAsyncThunk<Forum[], string>(
  "forums/fetchForums",
  async (state) => {
    try {
      const docRef = doc(db, "forums", state);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().forums as Forum[];
      } else {
        return [];
      }
    } catch (e) {
      console.error("Error fetching doc: ", e);
      throw e;
    }
  }
);

export const addForum = createAsyncThunk<Forum[], AddForumParams>(
  "forums/addForum",
  async ({ state, forum }) => {
    try {
      const docRef = doc(db, "forums", state);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const forums = docSnap.data().forums as Forum[];
        const newForums = [forum, ...forums];
        await setDoc(docRef, { forums: newForums });
        return newForums;
      } else {
        await setDoc(docRef, { forums: [forum] });
        return [forum];
      }
    } catch (e) {
      console.error("Error adding to doc: ", e);
      throw e;
    }
  }
);

export const addResponse = createAsyncThunk<Forum[], AddResponseParams>(
  "forums/addResponse",
  async ({ state, index, response }) => {
    try {
      const docRef = doc(db, "forums", state);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const forums = docSnap.data().forums as Forum[];
        const newForum = { ...forums[index] };
        newForum.responses.push(response);
        const newForums = forums.map((forum, i) => {
          if (i === index) {
            return newForum;
          } else {
            return forum;
          }
        });
        await setDoc(docRef, { forums: newForums });
        return newForums;
      }
      return [];
    } catch (e) {
      console.error("Error adding to doc: ", e);
      throw e;
    }
  }
);

export const removeForum = createAsyncThunk<Forum[], RemoveForumParams>(
  "forums/removeForum",
  async ({ state, index }) => {
    try {
      const docRef = doc(db, "forums", state);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const forums = docSnap.data().forums as Forum[];
        const newForums = forums.filter((forum, i) => i !== index);
        await setDoc(docRef, { forums: newForums });
        return newForums;
      }
      return [];
    } catch (e) {
      console.error("Error removing from doc: ", e);
      throw e;
    }
  }
);
