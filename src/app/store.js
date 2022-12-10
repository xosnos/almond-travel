import { configureStore } from '@reduxjs/toolkit';
import {
  articlesReducer,
  authReducer,
  checkListReducer,
  forumsReducer,
  tripsReducer,
} from '../features';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer,
    checkList: checkListReducer,
    forums: forumsReducer,
    trips: tripsReducer,
  },
});
