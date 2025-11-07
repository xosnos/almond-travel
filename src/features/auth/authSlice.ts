import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  handleRegister,
  handleLoginEmailAndPassword,
  handleLoginGoogle,
  handleReset,
  handleLogout
} from './authAPI';
import { AuthState, User } from '../../types';

const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        console.log("Signed in user: ", state.user);
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.error = action.error.message || 'Registration failed';
        state.loading = false;
      })
      .addCase(handleLoginEmailAndPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLoginEmailAndPassword.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        console.log("Signed in user: ", state.user);
      })
      .addCase(handleLoginEmailAndPassword.rejected, (state, action) => {
        state.error = action.error.message || 'Login failed';
        state.loading = false;
      })
      .addCase(handleLoginGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLoginGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        console.log("Signed in user: ", state.user);
      })
      .addCase(handleLoginGoogle.rejected, (state, action) => {
        state.error = action.error.message || 'Google login failed';
        state.loading = false;
      })
      .addCase(handleReset.rejected, (state, action) => {
        state.error = action.error.message || 'Password reset failed';
      })
      .addCase(handleLogout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.error = action.error.message || 'Logout failed';
      });
  },
});

export const { saveUser } = authSlice.actions;
export default authSlice.reducer;
