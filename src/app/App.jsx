import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Navigation from '../components/navigation';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Footer from '../components/footer';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/about' element={<h1>About</h1>} />
        <Route path='/features' element={<h1>Features</h1>} />
        <Route path='/faq' element={<h1>FAQ</h1>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
