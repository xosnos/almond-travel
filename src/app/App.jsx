import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Navigation from '../components/navigation';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Footer from '../components/footer';

const router = createBrowserRouter(
  
  
  [
  { path: '/', element: <HomePage />},
  { path: '/login', element: <LoginPage />},
]);

function App() {
  return (
    <>
      <Navigation />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
