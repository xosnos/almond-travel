import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Article } from "../../types";

export const fetchArticles = createAsyncThunk<Article[], string>(
  "articles/fetchArticles",
  async (category) => {
    try {
      const docRef = doc(db, 'articles', category);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().articles as Article[];
      }
      return [];
    } catch (error) {
      console.error("Error fetching articles: ", error);
      throw error;
    }
  }
);
