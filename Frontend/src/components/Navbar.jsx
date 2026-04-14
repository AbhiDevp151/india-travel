import React from 'react';
import { Link } from 'react-router-dom'; // Ye import karna zaroori hai

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex justify-between items-center text-white">
      <Link to="/" className="text-2xl font-bold tracking-tighter cursor-pointer flex items-center">
        INDIA<span className="text-orange-500 text-3xl">.</span>TRAVEL
      </Link>
      
      {/* Links ko explicit color de rahe hain */}
      <ul className="hidden md:flex gap-8 font-semibold text-gray-200">
        <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
        <li><Link to="/tours" className="hover:text-orange-400 transition-colors">Tours</Link></li>
        <li><Link to="/gallery" className="hover:text-orange-400 transition-colors">Gallery</Link></li>
      </ul>

      <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full font-bold text-sm transition-all">
        Login
      </button>
    </nav>
  );
};