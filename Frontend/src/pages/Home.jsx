import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TourCard from '../components/TourCard';
import Reviews from '../components/Reviews'; // Reviews component import kar lena

// --- DATA CONSTANTS ---
const HERO_SLIDES = [
  { label: '01', place: 'Taj Mahal', loc: 'Agra, UP', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&q=90' },
  { label: '02', place: 'Varanasi Ghats', loc: 'Uttar Pradesh', img: 'https://images.unsplash.com/photo-1561361513-2d8f558bc61b?w=1600&q=90' },
  { label: '03', place: 'Himalayas', loc: 'Himachal Pradesh', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90' },
];

const STATS = [
  { num: '28+', label: 'Indian States' },
  { num: '500+', label: 'Tours Done' },
  { num: '12K+', label: 'Happy Travelers' },
  { num: '4.9★', label: 'Avg Rating' },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Home = () => {
  const [tours, setTours] = useState([]); 
  const [slide, setSlide] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [budget, setBudget] = useState(80000);

  // 1. Fetch Filtered Data from Backend
  useEffect(() => {
    const fetchFilteredTours = async () => {
      try {
        const url = `/api/tours/search?month=${selectedMonth}&budget=${budget}`;
        const r = await axios.get(url);
        if (r.data) setTours(r.data);
      } catch (err) {
        console.error("Database connection error:", err);
      }
    };
    fetchFilteredTours();
  }, [selectedMonth, budget]); 

  // 2. Hero Slider Logic
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const current = HERO_SLIDES[slide];

  return (
    <main className="bg-zinc-950 text-white min-h-screen selection:bg-orange-500 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden">
        {HERO_SLIDES.map((s, i) => (
          <div 
            key={i} 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === slide ? 'opacity-40' : 'opacity-0'}`} 
            style={{ backgroundImage: `url(${s.img})` }} 
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl space-y-6">
            <p className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-[0.3em] text-xs">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" /> Discover Incredible India
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black italic uppercase leading-[0.85]">
              Time To<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 not-italic">Travel</span>
            </h1>
          </div>
        </div>
      </section>

      {/* 2. SMART PLANNER & RESULTS */}
      <section className="relative z-20 -mt-24 container mx-auto px-6">
        <div className="bg-zinc-900/95 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* LEFT: FILTERS */}
            <div className="lg:col-span-4 space-y-10 border-b lg:border-b-0 lg:border-r border-white/10 pb-10 lg:pb-0 lg:pr-12">
              <div>
                <p className="text-orange-500 font-black text-[10px] uppercase mb-6 tracking-[0.2em]">01. Choose Month</p>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setSelectedMonth("All")} 
                    className={`py-3 rounded-xl text-[10px] font-black transition-all border ${selectedMonth === "All" ? "bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/20" : "bg-white/5 border-white/5 hover:border-white/20"}`}
                  >
                    ALL
                  </button>
                  {MONTHS.map(m => (
                    <button 
                      key={m} 
                      onClick={() => setSelectedMonth(m)} 
                      className={`py-3 rounded-xl text-[10px] font-black transition-all border ${selectedMonth === m ? "bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/20" : "bg-white/5 border-white/5 hover:border-white/20"}`}
                    >
                      {m.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-orange-500 font-bold text-[10px] uppercase tracking-widest">02. Max Budget</p>
                  <p className="text-2xl font-black italic text-white leading-none">₹{Number(budget).toLocaleString('en-IN')}</p>
                </div>
                <input 
                  type="range" min="10000" max="100000" step="5000" value={budget} 
                  onChange={(e) => setBudget(e.target.value)} 
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500" 
                />
              </div>
            </div>

            {/* RIGHT: DYNAMIC RESULTS */}
            <div className="lg:col-span-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div>
                  <p className="text-orange-500 font-black uppercase tracking-widest text-[10px] mb-2">Results for {selectedMonth}</p>
                  <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-none">
                    Best <span className="not-italic text-zinc-800">Matches</span>
                  </h2>
                </div>
                <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-full">
                   <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{tours.length} Plans Found</p>
                </div>
              </div>

              {tours.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
                  {tours.map((t, i) => (
                    <TourCard key={t._id || i} tour={t} index={i} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded-[3rem] border border-dashed border-white/10 text-center">
                  <h3 className="text-xl text-gray-500 italic mb-4">No tours found for ₹{budget} in {selectedMonth}.</h3>
                  <button onClick={() => {setBudget(100000); setSelectedMonth("All")}} className="text-orange-500 font-black uppercase text-xs tracking-widest border-b-2 border-orange-500 pb-1">Reset Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATS BAR */}
      <section className="py-32 container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {STATS.map(s => (
          <div key={s.label}>
            <p className="text-5xl md:text-6xl font-black tracking-tighter">{s.num}</p>
            <p className="text-gray-600 uppercase text-[10px] tracking-[0.4em] font-bold mt-4">{s.label}</p>
          </div>
        ))}
      </section>

      {/* 4. REVIEWS SECTION (New) */}
      <Reviews />

      {/* 5. HOW IT WORKS */}
      <section className="py-32 bg-zinc-900/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-black italic uppercase mb-24">How we <span className="text-orange-500">Plan</span> it</h2>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { s: "01", t: "Set Budget", d: "Slider se apna budget fix karo." },
              { s: "02", t: "Select Month", d: "Climate ke hisaab se best jagah dekho." },
              { s: "03", t: "Let's Go", d: "Local guide ke saath trip start karo." }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="h-20 w-20 bg-zinc-950 border border-orange-500 rounded-full flex items-center justify-center mx-auto text-3xl font-black text-orange-500 mb-6">{item.s}</div>
                <h3 className="text-xl font-black uppercase mb-3">{item.t}</h3>
                <p className="text-gray-500 text-sm">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="container mx-auto px-6 mb-32 pt-10">
        <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden">
          <h2 className="text-5xl md:text-8xl font-black uppercase italic mb-10 relative z-10">Ready to Explore?</h2>
          <button className="bg-white text-orange-600 px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">Get Free Plan</button>
        </div>
      </section>
      
    </main>
  );
};

export default Home;