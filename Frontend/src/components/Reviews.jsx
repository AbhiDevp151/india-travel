import React from 'react';

const REVIEWS = [
  { name: "Rahul Verma", comment: "The budget slider is a life saver. Found a great trip to Spiti under 15k!", rating: 5 },
  { name: "Anjali Gupta", comment: "Our guide in Kerala was so professional. The month suggestion was spot on.", rating: 5 }
];

const Reviews = () => {
  return (
    <section className="py-24 bg-white/5 border-y border-white/5">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black italic uppercase mb-12 text-center">Traveler <span className="text-orange-500">Stories</span></h2>
        <div className="grid md:grid-cols-2 gap-8">
          {REVIEWS.map((rev, i) => (
            <div key={i} className="p-10 bg-zinc-900 rounded-[2.5rem] border border-white/5 relative">
              <span className="text-6xl text-orange-500/20 absolute top-6 right-8">"</span>
              <div className="flex text-orange-500 mb-4">{"★".repeat(rev.rating)}</div>
              <p className="text-gray-300 italic mb-6">"{rev.comment}"</p>
              <h4 className="font-black uppercase tracking-widest text-xs">- {rev.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;