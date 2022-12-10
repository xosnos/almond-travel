import { createSlice } from '@reduxjs/toolkit';
import { fetchArticles } from './articlesAPI';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
      });
  }
});

export default articlesSlice.reducer;