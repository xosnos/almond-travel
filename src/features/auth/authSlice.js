import { createSlice } from '@reduxjs/toolkit';
import {
  handleRegister,
  handleLoginEmailAndPassword,
  handleLoginGoogle,
  handleReset,
  handleLogout
} from './authAPI';


const authSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleRegister.fulfilled, (state, action) => {
      state.user = action.payload;
      console.log("Signed in user: ", state.user);
    });
    builder.addCase(handleRegister.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(handleLoginEmailAndPassword.fulfilled, (state, action) => {
      state.user = action.payload;
      console.log("Signed in user: ", state.user);
    });
    builder.addCase(handleLoginEmailAndPassword.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(handleLoginGoogle.fulfilled, (state, action) => {
      state.user = action.payload;
      console.log("Signed in user: ", state.user);
    });
    builder.addCase(handleLoginGoogle.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(handleReset.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(handleLogout.fulfilled, (state, action) => {
      state.user = undefined;
    });
    builder.addCase(handleLogout.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { saveUser } = authSlice.actions;
export default authSlice.reducer;