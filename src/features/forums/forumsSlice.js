import { createSlice } from '@reduxjs/toolkit';
import {
  fetchForums,
  addForum,
  removeForum,
} from './forumsAPI';

const forumsSlice = createSlice({
  name: 'forums',
  initialState: {
    forums: [],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForums.fulfilled, (state, action) => {
        state.forums = action.payload;
      })
      .addCase(addForum.fulfilled, (state, action) => {
        state.forums = action.payload;
      })
      .addCase(removeForum.fulfilled, (state, action) => {
        state.forums = action.payload;
      });
  }
});

export const { } = forumsSlice.actions;
export default forumsSlice.reducer;