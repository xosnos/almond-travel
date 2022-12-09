import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  setDoc
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export const addCheckList = createAsyncThunk(
  "checkList/addCheckList",
  async ({}) => {
    try {
      const docRef = await setDoc(doc(db, "checkList", "steven"), {
        title: "Check List",
        items: [
          {
            id: 1,
            text: "Item 1",
            checked: false,
          },
          {
            id: 2,
            text: "Item 2",
            checked: false,
          },
        ],
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
);