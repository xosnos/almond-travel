import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTrips,
  addTrip,
  removeTrip,
  updateTrip
} from './tripsAPI';

const tripsSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
  },
  reducers: {
    addTripItem (state, action) {
      const { tripIndex, type, item } = action.payload;
      state.trips[tripIndex][type].push(item);
    },
    removeTripItem (state, action) {
      const { tripIndex, type, index } = action.payload;
      state.trips[tripIndex][type].splice(index, 1);
    },
    updateTripItem (state, action) {
      const { tripIndex, type, value } = action.payload;
      if (type === 'name' || type === 'location') {
        state.trips[tripIndex][type] = value;
      } else {
        const { index, key } = action.payload;
        state.trips[tripIndex][type][index][key] = value;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrips.fulfilled, (state, action) => {
      state.trips = action.payload;
    });
    builder.addCase(addTrip.fulfilled, (state, action) => {
      state.trips = action.payload;
    });
    builder.addCase(removeTrip.fulfilled, (state, action) => {
      state.trips = action.payload;
    });
    builder.addCase(updateTrip.fulfilled, (state, action) => {
      state.trips = action.payload;
    });
  }
});

export const {
  addTripItem,
  removeTripItem,
  updateTripItem
} = tripsSlice.actions;
export default tripsSlice.reducer;