import { createSlice } from '@reduxjs/toolkit';
import {
  addTrip,
  removeTrip,
} from './tripsAPI';

const tripsSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addTrip.fulfilled, (state, action) => {
      state.trips = action.payload;
    });
    builder.addCase(removeTrip.fulfilled, (state, action) => {
      state.trips = action.payload;
    });
  }
});

export default tripsSlice.reducer;