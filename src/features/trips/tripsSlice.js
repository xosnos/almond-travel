import { createSlice } from '@reduxjs/toolkit';

const tripsSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
  },
  reducers: {
  },
});

export const { } = tripsSlice.actions;
export default tripsSlice.reducer;