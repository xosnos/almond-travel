import { createSlice } from '@reduxjs/toolkit';
import { addTrip } from './tripsAPI';

const tripsSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addTrip.fulfilled, (state, action) => {
      state.trips.push(action.payload);
    });
  }
});

export default tripsSlice.reducer;