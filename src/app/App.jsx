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
  RegisterPage,
  LoginPage,
  ResetPage,
  HomePage,
  ArticlesPage
} from '../pages';

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
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/new' element={<h1>New Trip</h1>} />

        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/register' element={<RegisterPage />} />
        <Route exact path='/reset' element={<ResetPage />} />

        <Route exact path='/articles' element={<ArticlesPage />} />

        <Route exact path='/dashboard' element={<h1>Dashboard</h1>} />

        <Route path='/about' element={<h1>About</h1>} />
        <Route path='/features' element={<h1>Features</h1>} />
        <Route path='/faq' element={<h1>FAQ</h1>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;