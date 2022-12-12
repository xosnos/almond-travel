import React, { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { saveUser } from '../features/auth/authSlice';
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
  // new trip
  NewTripPage,
  // trips
  TripsPage,
  TripPage,
} from '../features'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth,
      (user) => user ?
      dispatch(saveUser({email: user.email, uid: user.uid })) :
      dispatch(saveUser(null)));
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Navigation />
      <div className="min-vh-100">
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/register' element={<RegisterPage />} />
          <Route exact path='/reset' element={<ResetPage />} />


          <Route path='/new' element={<NewTripPage />} />
          <Route path='/trips' element={<TripsPage />} />
          <Route path='/trips/:tripId' element={<TripPage />} />

          <Route exact path='/forums' element={<ForumsPage />} />
          <Route exact path='/articles' element={<ArticlesPage />} />

          <Route exact path='/profile' element={<ProfilePage />} />

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