import { createSlice } from "@reduxjs/toolkit";

const tripSlice = createSlice({
  name: "trip",
  initialState: {
    name: '',
    location: '',
    flights: [],
    hotels: [],
    cars: [],
    activities: [],
    checklist: [],
  },
  reducers: {
    addItem (state, action) {
      const { type, item } = action.payload;
      state[type].push(item);
    },
    removeItem (state, action) {
      const { type, index } = action.payload;
      state[type].splice(index, 1);
    },
    updateItem (state, action) {
      const { type, value } = action.payload;
      if (type === 'name' || type === 'location') {
        state[type] = value;
      } else {
        const { index, key } = action.payload;
        state[type][index][key] = value;
      }
    },
    clearTrip (state) {
      state.name = '';
      state.location = '';
      state.flights = [];
      state.hotels = [];
      state.cars = [];
      state.activities = [];
      state.checklist = [];
    },
  }
});

export const {
  addItem,
  removeItem,
  updateItem,
  clearTrip,
} = tripSlice.actions;
export default tripSlice.reducer;