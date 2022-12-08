import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  auth,
  providerGoogle,
} from "../../lib/firebase";

export const handleRegister = createAsyncThunk(
  'user/handleRegister',
  async ({email, password}) => {
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
  async ({email, password}) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { email: response.user.email, uid: response.user.uid};
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
      const credential = GoogleAuthProvider.credentialFromResult(response);
      const token = credential.accessToken;
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

export const authSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleRegister.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(handleRegister.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
    });
    builder.addCase(handleRegister.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(handleLoginEmailAndPassword.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(handleLoginEmailAndPassword.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      console.log("Signed in user: ", state.user);
    });
    builder.addCase(handleLoginEmailAndPassword.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(handleLoginGoogle.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(handleLoginGoogle.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      console.log("Signed in user: ", state.user);
    });
    builder.addCase(handleLoginGoogle.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(handleReset.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(handleReset.fulfilled, (state, action) => {
      state.status = 'succeeded';
    });
    builder.addCase(handleReset.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(handleLogout.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(handleLogout.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = undefined;
    });
    builder.addCase(handleLogout.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { saveUser } = authSlice.actions;
export default authSlice.reducer;