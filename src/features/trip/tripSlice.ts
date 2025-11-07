import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trip, TripItem } from "../../types";

interface AddItemPayload {
  type: 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist';
  item: TripItem;
}

interface RemoveItemPayload {
  type: 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist';
  index: number;
}

interface UpdateItemPayload {
  type: 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist' | 'name' | 'location';
  value: string | boolean;
  index?: number;
  key?: string;
}

const initialState: Trip = {
  name: '',
  location: '',
  flights: [],
  hotels: [],
  cars: [],
  activities: [],
  checklist: [],
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<AddItemPayload>) {
      const { type, item } = action.payload;
      state[type].push(item);
    },
    removeItem(state, action: PayloadAction<RemoveItemPayload>) {
      const { type, index } = action.payload;
      state[type].splice(index, 1);
    },
    updateItem(state, action: PayloadAction<UpdateItemPayload>) {
      const { type, value } = action.payload;
      if (type === 'name' || type === 'location') {
        if (typeof value === 'string') {
          state[type] = value;
        }
      } else {
        const { index, key } = action.payload;
        if (index !== undefined && key) {
          state[type][index][key] = value;
        }
      }
    },
    clearTrip() {
      return initialState;
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
