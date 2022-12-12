import { configureStore } from '@reduxjs/toolkit';
import {
  articlesReducer,
  authReducer,
  forumsReducer,
  tripsReducer,
  tripReducer,
} from '../features';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer,
    forums: forumsReducer,
    trips: tripsReducer,
    trip: tripReducer,
  },
});
