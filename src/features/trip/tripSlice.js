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
      const { type } = action.payload;
      if (type === 'name' || type === 'location') {
        state[type] = action.payload.value;
      } else {
        const { index, key, value } = action.payload;
        state[type][index][key] = value;
      }
    },
  }
});

export const {
  addItem,
  removeItem,
  updateItem
} = tripSlice.actions;
export default tripSlice.reducer;