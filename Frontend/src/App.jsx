import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tour from './pages/Tour';
import Login from './pages/Login';
import Gallery from './pages/Gallery';
import TourDetails from './pages/TourDetails';
import Admin from './pages/Admin'; // 👉 YE IMPORT ZAROORI HAI

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tour />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} /> 
        
        {/* 👉 ADMIN ROUTE YAHAN HAI */}
        <Route path="/admin" element={<Admin />} /> 
      </Routes>
    </Router>
  );
}

export default App;