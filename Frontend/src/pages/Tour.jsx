import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TourCard from '../components/TourCard';

// 1. Static Data (Bahar define karna safe rehta hai)
const STATIC_TOURS = [
  { _id: '1', title: 'Golden Triangle', location: 'Delhi - Agra - Jaipur', state: 'Rajasthan', duration: '7 Days', price: 45000, difficulty: 'Easy', rating: 4.9, reviewCount: 312, featured: true },
  { _id: '2', title: 'Kerala Backwaters', location: 'Alleppey - Munnar', state: 'Kerala', duration: '6 Days', price: 38000, difficulty: 'Easy', rating: 4.8, reviewCount: 289, featured: true },
  { _id: '3', title: 'Himalayan Expedition', location: 'Manali - Spiti', state: 'Himachal Pradesh', duration: '10 Days', price: 62000, difficulty: 'Challenging', rating: 4.7, reviewCount: 176, featured: true },
  { _id: '4', title: 'Rajasthan Desert Safari', location: 'Jaisalmer - Udaipur', state: 'Rajasthan', duration: '8 Days', price: 52000, difficulty: 'Moderate', rating: 4.9, reviewCount: 401, featured: true },
];

const DIFFICULTIES = ['All', 'Easy', 'Moderate', 'Challenging'];
const STATES = ['All States', 'Rajasthan', 'Kerala', 'Himachal Pradesh', 'Uttar Pradesh', 'Goa', 'Ladakh'];

export default function Tour() {
  const [tours, setTours] = useState(STATIC_TOURS); // Initialize with static data
  const [difficulty, setDifficulty] = useState('All');
  const [state, setState] = useState('All States');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const r = await axios.get('/api/tours');
        if (r.data && Array.isArray(r.data)) {
          setTours(r.data);
        }
      } catch (err) {
        console.log("Using static data for Tours page");
        setTours(STATIC_TOURS);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  // 2. Filter Logic (Isse function ke andar rakhna padta hai render ke liye)
  const filtered = (Array.isArray(tours) ? tours : []).filter(t => {
    const matchDifficulty = difficulty === 'All' || t.difficulty === difficulty;
    const matchState = state === 'All States' || t.state === state;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                        t.location.toLowerCase().includes(search.toLowerCase());
    return matchDifficulty && matchState && matchSearch;
  });

  return (
    <main className="bg-zinc-950 pt-32 pb-20 min-h-screen text-white">
      <div className="container mx-auto px-6">
        <header className="mb-12 border-l-4 border-orange-500 pl-6 animate-fade-in">
          <h1 className="text-6xl font-black italic uppercase leading-none">
            All <span className="text-orange-500 not-italic">Tours</span>
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Discover {filtered?.length || 0} handcrafted journeys across India.
          </p>
        </header>

        {/* Filters Bar */}
        <div className="grid md:grid-cols-4 gap-6 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-lg mb-12 sticky top-24 z-30 shadow-2xl">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search destinations..." 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-all text-sm" 
            />
          </div>
          
          <select 
            value={difficulty} 
            onChange={e => setDifficulty(e.target.value)} 
            className="bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-sm appearance-none"
          >
            {DIFFICULTIES.map(d => <option key={d} value={d}>{d} Difficulty</option>)}
          </select>

          <select 
            value={state} 
            onChange={e => setState(e.target.value)} 
            className="bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-sm appearance-none"
          >
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <button 
            className="bg-orange-500 hover:bg-orange-600 font-bold py-3 rounded-lg transition-all text-sm active:scale-95"
            onClick={() => {setSearch(''); setDifficulty('All'); setState('All States');}}
          >
            Reset Filters
          </button>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="text-center py-20 text-orange-500 font-bold animate-pulse">Loading Tours...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.length > 0 ? (
              filtered.map((t, i) => (
                <TourCard key={t._id || i} tour={t} index={i} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-xl">No tours found matching your filters. 🗺️</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}