import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tour from './pages/Tour';
import Login from './pages/Login';
import Gallery from './pages/Gallery';
import TourDetails from './pages/TourDetails'; // "Learn More" wala page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tour />} />
        <Route path="/gallery" element={<Gallery />} />
        
        {/* Dynamic Route: :id ka matlab hai yahan kisi bhi tour ki ID aa sakti hai */}
        <Route path="/tour/:id" element={<TourDetails />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        {/* Baad mein Register page bana ke yahan link kar dena */}
        <Route path="/register" element={<Login />} /> 
      </Routes>
    </Router>
  );
}

export default App;