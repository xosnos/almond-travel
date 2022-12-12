import { createSlice } from '@reduxjs/toolkit';
import {
  fetchForums,
  addForum,
  addResponse,
  removeForum,
} from './forumsAPI';

const forumsSlice = createSlice({
  name: 'forums',
  initialState: {
    forum: {
      title: '',
      description: '',
      responses: [],
    },
    response: {
      description: '',
      timePosted: '',
    },
    forums: [],
  },
  reducers: {
    updateForum (state, action) {
      const { key, value } = action.payload;
      state.forum[key] = value;
    },
    updateResponse (state, action) {
      const { key, value } = action.payload;
      state.response[key] = value;
    },
    clearForums (state, action) {
      state.forums = [];
      state.forum.title = '';
      state.forum.description = '';
      state.forum.originalPoster = '';
      state.forum.timePosted = '';
      state.forum.responses = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForums.fulfilled, (state, action) => {
        state.forums = action.payload;
      })
      .addCase(addForum.fulfilled, (state, action) => {
        state.forums = action.payload;
        state.forum.title = '';
        state.forum.description = '';
        state.forum.responses = [];
      })
      .addCase(addResponse.fulfilled, (state, action) => {
        state.forums = action.payload;
        state.response.description = '';
      })
      .addCase(removeForum.fulfilled, (state, action) => {
        state.forums = action.payload;
      });
  }
});

export const { updateForum, updateResponse, clearForums } = forumsSlice.actions;
export default forumsSlice.reducer;