import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (category) => {
    try {
      const docRef = doc(db, 'articles', category);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().articles;
      }
    } catch (error) {
      console.log(error);
    }
  }
);