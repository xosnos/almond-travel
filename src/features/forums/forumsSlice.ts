import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchForums,
  addForum,
  addResponse,
  removeForum,
} from './forumsAPI';
import { Forum, ForumResponse } from '../../types';

interface ForumFormState {
  title: string;
  description: string;
  responses: ForumResponse[];
  [key: string]: any;
}

interface ResponseFormState {
  description: string;
  timePosted: string;
  [key: string]: any;
}

interface ForumsState {
  forum: ForumFormState;
  response: ResponseFormState;
  forums: Forum[];
  loading: boolean;
  error: string | null;
}

interface UpdateForumPayload {
  key: string;
  value: any;
}

interface UpdateResponsePayload {
  key: string;
  value: any;
}

const initialState: ForumsState = {
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
  loading: false,
  error: null,
};

const forumsSlice = createSlice({
  name: 'forums',
  initialState,
  reducers: {
    updateForum(state, action: PayloadAction<UpdateForumPayload>) {
      const { key, value } = action.payload;
      state.forum[key] = value;
    },
    updateResponse(state, action: PayloadAction<UpdateResponsePayload>) {
      const { key, value } = action.payload;
      state.response[key] = value;
    },
    clearForums(state) {
      state.forums = [];
      state.forum.title = '';
      state.forum.description = '';
      state.forum.responses = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForums.fulfilled, (state, action) => {
        state.forums = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchForums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch forums';
      })
      .addCase(addForum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addForum.fulfilled, (state, action) => {
        state.forums = action.payload;
        state.forum.title = '';
        state.forum.description = '';
        state.forum.responses = [];
        state.loading = false;
        state.error = null;
      })
      .addCase(addForum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add forum';
      })
      .addCase(addResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addResponse.fulfilled, (state, action) => {
        state.forums = action.payload;
        state.response.description = '';
        state.loading = false;
        state.error = null;
      })
      .addCase(addResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add response';
      })
      .addCase(removeForum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeForum.fulfilled, (state, action) => {
        state.forums = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(removeForum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to remove forum';
      });
  }
});

export const { updateForum, updateResponse, clearForums } = forumsSlice.actions;
export default forumsSlice.reducer;
