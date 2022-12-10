import React, { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
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
  ProfilePage,
  ArticlesPage,
  NewTripPage,
  AboutPage,
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
      <Container className="min-vh-100">
        <Routes>
          <Route path='/' element={<HomePage />} />
          

          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/register' element={<RegisterPage />} />
          <Route exact path='/reset' element={<ResetPage />} />


          <Route path='/new' element={<NewTripPage />} />
          <Route path='/trips' element={<h1>Edit Trip</h1>} />
          <Route path='/trips/:tripId' element={<h1>Edit Trip</h1>} />
          <Route path='/resources' element={<h1>Resources</h1>} />
          <Route exact path='/articles' element={<ArticlesPage />} />

          <Route exact path='/profile' element={<ProfilePage />} />

          <Route path='/about' element={<AboutPage />} />
          <Route path='/features' element={<h1>Features</h1>} />
          <Route path='/faq' element={<h1>FAQ</h1>} />

        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;