import { createSlice } from '@reduxjs/toolkit';
import { addTrip } from './tripsAPI';

const tripsSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
  },
  reducers: {
    updateFlight (state, action) {
      const { id, flights } = action.payload;
      const exisitingTrip = state.trips.find((trip) => trip.id === id);
      if (exisitingTrip) {
        exisitingTrip.flights = flights;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTrip.fulfilled, (state, action) => {
      state.trips.push(action.payload);
    });
  }
});

export default tripsSlice.reducer;