import { createSlice } from '@reduxjs/toolkit';
import {
  handleRegister,
  handleLoginEmailAndPassword,
  handleLoginGoogle,
  handleReset,
  handleLogout
} from './authAPI';


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