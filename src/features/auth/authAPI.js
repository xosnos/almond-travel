import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  // GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  auth,
  providerGoogle,
} from "../../lib/firebase";

export const handleRegister = createAsyncThunk(
  'user/handleRegister',
  async ({ email, password }) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      return { email: response.user.email, uid: response.user.uid };
    } catch (error) {

      alert("Email is already in use. Please sign in or use a different email.");
      console.log("Error: ", error.code, error.message);
    }
  }
);

export const handleLoginEmailAndPassword = createAsyncThunk(
  'user/handleLoginEmailAndPassword',
  async ({ email, password }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { email: response.user.email, uid: response.user.uid };
    } catch (error) {
      alert("Email and/or password is incorrect. Please try again.");
      console.log("Error: ", error.code, error.message);
    }
  }
);

export const handleLoginGoogle = createAsyncThunk(
  'user/handleLoginGoogle',
  async () => {
    try {
      const response = await signInWithPopup(auth, providerGoogle);
      // const credential = GoogleAuthProvider.credentialFromResult(response);
      // const token = credential.accessToken;
      return { email: response.user.email, uid: response.user.uid };
    } catch (error) {
      console.log("Error: ", error.code, error.message);
    }
  }
);

export const handleReset = createAsyncThunk(
  'user/handleReset',
  async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent.');
    } catch (error) {
      // const email = error.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("Error: ", error.code, error.message);
    }
  }
);

export const handleLogout = createAsyncThunk(
  'user/handleLogout',
  async () => {
    try {
      await signOut(auth);
      console.log('Signed out user.');
    } catch (error) {
      console.log("Error: ", error.code, error.message);
    }
  }
);