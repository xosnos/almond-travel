export { default as articlesReducer } from './articles/articlesSlice';
export { fetchArticles } from './articles/articlesAPI';

export { default as authReducer } from './auth/authSlice';
export { default as forumsReducer } from './forums/forumsSlice';

export { default as tripsReducer } from './trips/tripsSlice';
export { addTrip } from './trips/tripsAPI';

export { default as tripReducer } from './trip/tripSlice';
export {
  addItem,
  removeItem,
  updateItem
} from './trip/tripSlice';