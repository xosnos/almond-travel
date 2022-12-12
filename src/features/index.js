export { default as articlesReducer } from './articles/articlesSlice';
export { ArticlesPage } from './articles/ArticlesPage';

export { default as authReducer } from './auth/authSlice';
export { LoginPage } from './auth/LoginPage';
export { ProfilePage } from './auth/ProfilePage';
export { RegisterPage } from './auth/RegisterPage';
export { ResetPage } from './auth/ResetPage';

export { default as forumsReducer } from './forums/forumsSlice';
export { ForumsPage } from './forums/ForumsPage';

export { default as tripReducer } from './trip/tripSlice';
export {
  addItem,
  removeItem,
  updateItem,
  clearTrip,
} from './trip/tripSlice';
export { NewTripPage } from './trip/NewTripPage';

export { default as tripsReducer } from './trips/tripsSlice';
export { addTrip } from './trips/tripsAPI';
export { TripsPage } from './trips/TripsPage';
export { TripPage } from './trips/TripPage';