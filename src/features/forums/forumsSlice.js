import { createSlice } from '@reduxjs/toolkit';

const forumsSlice = createSlice({
  name: 'forums',
  initialState: {
    forums: {},
  },
  reducers: {
  },
});

export const { } = forumsSlice.actions;
export default forumsSlice.reducer;