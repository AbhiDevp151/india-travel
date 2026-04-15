import React from 'react';
import { useParams } from 'react-router-dom';

const TourDetails = () => {
  const { id } = useParams(); // URL se ID lega (e.g. /tour/1)

  return (
    <main className="min-h-screen bg-zinc-950 pt-32 text-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Images */}
          <div className="rounded-[3rem] overflow-hidden border border-white/10 h-[500px]">
            <img src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200" className="w-full h-full object-cover" alt="Tour" />
          </div>

          {/* Right: Info */}
          <div className="space-y-8">
            <h1 className="text-6xl font-black italic uppercase leading-none">The Golden <br/><span className="text-orange-500 not-italic">Triangle</span></h1>
            <div className="flex gap-4 text-xs font-black uppercase tracking-widest text-gray-500">
              <span className="bg-white/5 px-4 py-2 rounded-full border border-white/5">7 Days</span>
              <span className="bg-white/5 px-4 py-2 rounded-full border border-white/5 text-orange-500">October Best</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed italic">
              Experience the royalty of Agra, the spirituality of Delhi, and the vibrant colors of Jaipur. Our budget-optimized plan includes boutique stays and private guides.
            </p>
            
            <div className="p-8 bg-orange-600 rounded-[2rem] shadow-2xl shadow-orange-900/20">
              <p className="uppercase text-[10px] font-black tracking-widest mb-2 opacity-80">Starting from</p>
              <p className="text-4xl font-black italic">₹45,000 <span className="text-sm not-italic opacity-80">/ person</span></p>
              <button className="w-full mt-6 bg-white text-orange-600 font-black py-4 rounded-2xl uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Book This Experience</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TourDetails;