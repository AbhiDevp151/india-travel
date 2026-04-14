import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TourCard from '../components/TourCard';

// Static Data (Same as yours)
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

const STATIC_TOURS = [
  { _id: '1', title: 'Golden Triangle', location: 'Delhi - Agra - Jaipur', duration: '7 Days', price: 45000, rating: 4.9, difficulty: 'Easy', featured: true },
  { _id: '2', title: 'Kerala Backwaters', location: 'Alleppey - Munnar', duration: '6 Days', price: 38000, rating: 4.8, difficulty: 'Easy', featured: true },
];

export default function Home() {
  const [tours, setTours] = useState(STATIC_TOURS); 
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const r = await axios.get('/api/tours/featured');
        if (r.data && Array.isArray(r.data)) setTours(r.data);
      } catch (err) {
        setTours(STATIC_TOURS);
      }
    };
    fetchTours();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const current = HERO_SLIDES[slide];

  return (
    <main className="bg-zinc-950 text-white min-h-screen">
      {/* 1. HERO SECTION: Added pt-20 to push content below Navbar */}
      <section className="relative h-[100vh] flex items-center pt-20 overflow-hidden">
        {HERO_SLIDES?.map((s, i) => (
          <div key={i} 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${i === slide ? 'opacity-40' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${s.img})` }} />
        ))}
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
            <p className="flex items-center gap-2 text-orange-500 font-bold tracking-widest uppercase text-sm">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Discover Incredible India
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] italic uppercase">
              Time To<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 not-italic">Travel</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-md leading-relaxed">
              India is not just a destination — it's a transformation. Experience the magic of the subcontinent.
            </p>
            <div className="flex gap-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-orange-900/40">
                Explore Tours →
              </button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="hidden md:flex flex-col gap-6 absolute right-10 top-1/2 -translate-y-1/2 z-20">
            {HERO_SLIDES?.map((s, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className={`text-sm font-black transition-all duration-300 ${i === slide ? 'text-orange-500 scale-150' : 'text-gray-600 hover:text-gray-400'}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Place Badge */}
        <div className="absolute bottom-12 left-6 md:left-12 border-l-4 border-orange-500 pl-4 z-10">
          <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter">{current?.place}</p>
          <p className="text-orange-500/80 text-xs md:text-sm font-bold uppercase tracking-[0.2em]">{current?.loc}</p>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="py-16 bg-zinc-900/50 border-y border-white/5 backdrop-blur-xl">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {STATS?.map(s => (
            <div key={s.label} className="group">
              <p className="text-4xl md:text-5xl font-black text-white group-hover:text-orange-500 transition-colors duration-300">{s.num}</p>
              <p className="text-gray-500 uppercase text-[10px] md:text-xs tracking-[0.3em] font-bold mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. POPULAR TOURS */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <p className="text-orange-500 font-black uppercase tracking-widest text-xs mb-3">Handpicked for you</p>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-none">India's Most <br/> <span className="not-italic text-zinc-700">Coveted</span></h2>
          </div>
          <button className="text-orange-500 font-black uppercase tracking-widest text-xs border-b-2 border-orange-500 pb-1 hover:text-white hover:border-white transition-all">
            View All Experiences
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {Array.isArray(tours) && tours.map((t, i) => (
            <TourCard key={t._id || i} tour={t} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}