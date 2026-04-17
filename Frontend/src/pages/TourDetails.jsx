import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BookingModal from '../components/BookingModal'; // 1. MODAL IMPORT KIYA

const TourDetails = () => {
  const { id } = useParams(); // URL se ID nikalna
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // 2. MODAL KI STATE ADD KI

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const r = await axios.get(`/api/tours/${id}`);
        setTour(r.data);
      } catch (err) {
        console.error("Error fetching tour details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTourDetails();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Not Found State
  if (!tour) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
        <h2 className="text-4xl font-black italic uppercase">Tour Not Found</h2>
        <Link to="/" className="mt-4 text-orange-500 font-bold uppercase tracking-widest text-sm border-b border-orange-500 pb-1">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-zinc-950 min-h-screen text-white pt-24 pb-32 font-sans selection:bg-orange-500 relative">
      <div className="container mx-auto px-6">
        
        {/* TOP: Image Gallery (Premium Look) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-16 h-[50vh] md:h-[70vh]">
          {/* Main Big Image */}
          <div className="md:col-span-8 rounded-[2.5rem] overflow-hidden relative group border border-white/10">
            <img 
              src={tour.images?.[0] || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da'} 
              alt={tour.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
          </div>
          
          {/* Side Images */}
          <div className="hidden md:flex flex-col md:col-span-4 gap-4">
            <div className="h-1/2 rounded-[2.5rem] overflow-hidden border border-white/10 relative group">
              <img 
                src={tour.images?.[1] || 'https://images.unsplash.com/photo-1548013146-72479768bbaa'} 
                alt="Gallery 2" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="h-1/2 rounded-[2.5rem] overflow-hidden border border-white/10 relative group bg-zinc-900 flex items-center justify-center">
              {tour.images?.length > 2 ? (
                <img 
                  src={tour.images[2]} 
                  alt="Gallery 3" 
                  className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="text-center z-10">
                  <p className="text-orange-500 font-black text-3xl">+{tour.images?.length || 0}</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">More Photos</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM: Content Grid */}
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* LEFT: Tour Details */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-black text-orange-500">
                  {tour.budgetCategory}
                </span>
                <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-black">
                  {tour.difficulty}
                </span>
                <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-black flex items-center gap-1">
                  <span className="text-orange-500">★</span> {tour.rating}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-[0.9] tracking-tighter mb-4">
                {tour.title}
              </h1>
              <p className="text-xl text-orange-500 font-bold tracking-widest uppercase mb-8">📍 {tour.location}</p>
              <p className="text-gray-400 text-lg leading-relaxed">{tour.description}</p>
            </div>

            {/* Itinerary Timeline */}
            <div>
              <h2 className="text-3xl font-black italic uppercase mb-8 border-l-4 border-orange-500 pl-4">Daily <span className="text-orange-500">Itinerary</span></h2>
              <div className="space-y-6">
                {tour.itinerary?.length > 0 ? tour.itinerary.map((step, i) => (
                  <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-3xl flex gap-6 hover:border-orange-500/30 transition-colors">
                    <div className="flex flex-col items-center justify-center w-16 h-16 bg-zinc-900 border border-white/10 rounded-2xl shrink-0">
                      <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Day</span>
                      <span className="text-2xl font-black text-orange-500">{step.day}</span>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-300">{step.details}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 italic">Detailed itinerary will be shared upon booking.</p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Floating Booking Card */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 bg-zinc-900/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[3rem] shadow-2xl">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Total Package</p>
              <div className="flex items-end gap-2 mb-8">
                <h3 className="text-5xl font-black italic text-white leading-none">₹{tour.price.toLocaleString('en-IN')}</h3>
                <span className="text-gray-500 font-bold mb-1">/ person</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Duration</span>
                  <span className="font-black">{tour.duration}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Best Time</span>
                  <span className="font-black text-orange-500">{tour.optimalMonths[0]} - {tour.optimalMonths[tour.optimalMonths.length -1]}</span>
                </div>
              </div>

              {/* 3. BUTTON MEIN onClick ADD KIYA */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-black py-5 rounded-2xl uppercase tracking-widest shadow-[0_10px_30px_-10px_rgba(249,115,22,0.5)] hover:scale-105 active:scale-95 transition-all"
              >
                Book Experience
              </button>
              
              <p className="text-center text-[10px] text-gray-500 font-bold mt-6">Includes accommodation, meals, and local guide.</p>
            </div>
          </div>

        </div>
      </div>

      {/* 4. YAHAN MODAL RENDER HOGA JAB isModalOpen TRUE HOGA */}
      {isModalOpen && (
        <BookingModal tour={tour} onClose={() => setIsModalOpen(false)} />
      )}

    </main>
  );
};

export default TourDetails;