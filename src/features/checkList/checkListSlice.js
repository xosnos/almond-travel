import { createSlice } from '@reduxjs/toolkit';
import { addCheckList } from './checkListAPI';

export const checkListSlice = createSlice({
  name: 'checkList',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCheckList.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(addCheckList.fulfilled, (state, action) => {
        console.log('fulfilled');
      })
      .addCase(addCheckList.rejected, (state, action) => {
        console.log('rejected');
      });
  }
});

export const { } = checkListSlice.actions;
export default checkListSlice.reducer;