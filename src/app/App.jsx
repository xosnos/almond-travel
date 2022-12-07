import React, { useEffect } from 'react';
// import './App.css';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { firebaseConfig } from '../lib/firebase';
import { selectUser, saveUser } from '../features/auth/authSlice';
import Navigation from '../components/navigation';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ResetPage from '../pages/auth/ResetPage';
import Footer from '../components/footer';

function App() {
  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const user = useSelector(selectUser);
  console.log("User: ", user);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => user ?
      dispatch(saveUser(user.refreshToken))
      : dispatch(saveUser(null)))
  }, [auth, dispatch]);
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/new' element={<h1>New Trip</h1>} />

        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/register' element={<RegisterPage />} />
        <Route exact path='/reset' element={<ResetPage />} />

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
