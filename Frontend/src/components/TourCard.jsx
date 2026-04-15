import React from 'react';
import { Link } from 'react-router-dom'; // Routing ke liye zaroori hai

const TourCard = ({ tour, index }) => {
  // Destructuring (Like Java POJO Getters)
  const { _id, title, location, duration, price, rating, difficulty, featured } = tour;

  return (
    <div 
      className="group relative bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl shadow-black"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
          Featured
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={`https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80`} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
        
        {/* Price Tag */}
        <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-lg">
          <span className="text-orange-400 font-black text-lg">₹{price.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors uppercase tracking-tight">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-orange-500 text-sm font-bold">
            <span>★</span>
            <span className="text-white">{rating}</span>
          </div>
        </div>

        <p className="text-gray-400 text-xs flex items-center gap-1 mb-4">
          <span className="text-orange-500">📍</span> {location}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Duration</span>
            <span className="text-sm text-gray-300 font-medium">{duration}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Level</span>
            <span className={`text-sm font-bold ${
              difficulty === 'Challenging' ? 'text-red-500' : 
              difficulty === 'Moderate' ? 'text-orange-400' : 'text-green-500'
            }`}>
              {difficulty}
            </span>
          </div>
        </div>

        {/* --- DYNAMIC LINK ADDED HERE --- */}
        <Link 
          to={`/tour/${_id}`} 
          className="block w-full mt-6 py-3 bg-white/5 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all border border-white/10 hover:border-orange-500 text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TourCard;