import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import checkListReducer from '../features/checkList/checkListSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    checkList: checkListReducer,
  },
});
