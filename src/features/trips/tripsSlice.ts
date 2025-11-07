import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchTrips,
  addTrip,
  removeTrip,
  updateTrip
} from './tripsAPI';
import { TripsState, TripItem } from '../../types';

interface AddTripItemPayload {
  tripIndex: number;
  type: 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist';
  item: TripItem;
}

interface RemoveTripItemPayload {
  tripIndex: number;
  type: 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist';
  index: number;
}

interface UpdateTripItemPayload {
  tripIndex: number;
  type: 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist' | 'name' | 'location';
  value: string;
  index?: number;
  key?: string;
}

const initialState: TripsState = {
  trips: [],
  loading: false,
  error: null,
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    addTripItem(state, action: PayloadAction<AddTripItemPayload>) {
      const { tripIndex, type, item } = action.payload;
      if (state.trips[tripIndex]) {
        state.trips[tripIndex][type].push(item);
      }
    },
    removeTripItem(state, action: PayloadAction<RemoveTripItemPayload>) {
      const { tripIndex, type, index } = action.payload;
      if (state.trips[tripIndex]) {
        state.trips[tripIndex][type].splice(index, 1);
      }
    },
    updateTripItem(state, action: PayloadAction<UpdateTripItemPayload>) {
      const { tripIndex, type, value } = action.payload;
      if (!state.trips[tripIndex]) return;

      if (type === 'name' || type === 'location') {
        state.trips[tripIndex][type] = value;
      } else {
        const { index, key } = action.payload;
        if (index !== undefined && key) {
          state.trips[tripIndex][type][index][key] = value;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.trips = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch trips';
      })
      .addCase(addTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTrip.fulfilled, (state, action) => {
        state.trips = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add trip';
      })
      .addCase(removeTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTrip.fulfilled, (state, action) => {
        state.trips = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(removeTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to remove trip';
      })
      .addCase(updateTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTrip.fulfilled, (state, action) => {
        state.trips = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update trip';
      });
  }
});

export const {
  addTripItem,
  removeTripItem,
  updateTripItem
} = tripsSlice.actions;
export default tripsSlice.reducer;
