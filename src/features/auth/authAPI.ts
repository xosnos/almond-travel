import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  auth,
  providerGoogle,
} from "../../lib/firebase";
import { User } from "../../types";

interface AuthCredentials {
  email: string;
  password: string;
}

export const handleRegister = createAsyncThunk<User, AuthCredentials>(
  'user/handleRegister',
  async ({ email, password }) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      return { email: response.user.email!, uid: response.user.uid };
    } catch (error: any) {
      alert("Email is already in use. Please sign in or use a different email.");
      console.error("Error: ", error.code, error.message);
      throw error;
    }
  }
);

export const handleLoginEmailAndPassword = createAsyncThunk<User, AuthCredentials>(
  'user/handleLoginEmailAndPassword',
  async ({ email, password }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { email: response.user.email!, uid: response.user.uid };
    } catch (error: any) {
      alert("Email and/or password is incorrect. Please try again.");
      console.error("Error: ", error.code, error.message);
      throw error;
    }
  }
);

export const handleLoginGoogle = createAsyncThunk<User>(
  'user/handleLoginGoogle',
  async () => {
    try {
      const response = await signInWithPopup(auth, providerGoogle);
      return { email: response.user.email!, uid: response.user.uid };
    } catch (error: any) {
      console.error("Error: ", error.code, error.message);
      throw error;
    }
  }
);

export const handleReset = createAsyncThunk<void, string>(
  'user/handleReset',
  async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent.');
    } catch (error: any) {
      console.error("Error: ", error.code, error.message);
      throw error;
    }
  }
);

export const handleLogout = createAsyncThunk<void>(
  'user/handleLogout',
  async () => {
    try {
      await signOut(auth);
      console.log('Signed out user.');
    } catch (error: any) {
      console.error("Error: ", error.code, error.message);
      throw error;
    }
  }
);
