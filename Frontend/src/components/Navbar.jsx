import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Page load par check karo user logged in hai ya nahi
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
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

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            // LOGGED IN STATE
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img 
                  src={user.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full border border-orange-500 object-cover"
                />
                <span className="text-sm font-bold hidden sm:block">{user.name}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            // LOGGED OUT STATE
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="text-gray-400 hover:text-white font-bold text-[10px] uppercase tracking-widest transition-colors hidden sm:block"
              >
                Login
              </button>
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full font-black text-[10px] text-white uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-orange-500/20"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal Render */}
      {isAuthOpen && (
        <AuthModal 
          onClose={() => setIsAuthOpen(false)} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}
    </>
  );
};

export default Navbar;