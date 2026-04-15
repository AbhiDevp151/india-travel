import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex justify-between items-center text-white">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-tighter cursor-pointer flex items-center">
        INDIA<span className="text-orange-500 text-3xl">.</span>TRAVEL
      </Link>
      
      {/* Navigation Links */}
      <ul className="hidden md:flex gap-8 font-semibold text-gray-400">
        <li>
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
        </li>
        <li>
          <Link to="/tours" className="hover:text-orange-400 transition-colors">Tours</Link>
        </li>
        <li>
          <Link to="/gallery" className="hover:text-orange-400 transition-colors">Gallery</Link>
        </li>
      </ul>

      {/* Login Button - Ab ye Modal nahi, seedha Login Page (/login) par bhejega */}
      <Link 
        to="/login"
        className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-orange-500/20 inline-block text-center"
      >
        Login
      </Link>
    </nav>
  );
};

export default Navbar;