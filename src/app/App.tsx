import React, { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { saveUser } from '../features/auth/authSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import {
  Navigation,
  Footer,
} from '../components';
import {
  HomePage,
  AboutPage,
  FeaturesPage,
  FaqPage,
  ErrorPage,
} from '../pages';
import {
  // articles
  ArticlesPage,
  // auth
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResetPage,
  // forums
  ForumsPage,
  Forums,
  Forum,
  // new trip
  NewTripPage,
  // trips
  TripsPage,
  TripPage,
} from '../features';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser({ email: user.email!, uid: user.uid }));
      } else {
        dispatch(saveUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navigation />
      <div className="min-vh-100">
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/reset' element={<ResetPage />} />

          <Route path='/new' element={<NewTripPage />} />
          <Route path='/trips' element={<TripsPage />} />
          <Route path='/trips/:tripIndex' element={<TripPage />} />

          <Route path='/forums' element={<ForumsPage />} />
          <Route path='/forums/:state' element={<Forums />} />
          <Route path='/forums/:state/:index' element={<Forum />} />
          <Route path='/articles' element={<ArticlesPage />} />

          <Route path='/profile' element={<ProfilePage />} />

          <Route path='/about' element={<AboutPage />} />
          <Route path='/features' element={<FeaturesPage />} />
          <Route path='/faq' element={<FaqPage />} />

          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
