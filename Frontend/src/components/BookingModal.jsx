import React, { useState } from 'react';

const BookingModal = ({ tour, onClose }) => {
  const [travelers, setTravelers] = useState(1);
  const [date, setDate] = useState('');

  // Real-time calculation
  const totalAmount = tour.price * travelers;

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!date) return alert("Bhai, pehle travel date toh select kar!");
    
    // Future mein yahan Backend API call jayegi (Booking DB mein save karne ke liye)
    alert(`🎉 Booking Confirmed!\nTour: ${tour.title}\nTravelers: ${travelers}\nTotal: ₹${totalAmount.toLocaleString('en-IN')}\n\nJaldi hi payment gateway aayega!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="bg-zinc-950 border border-white/10 rounded-[2.5rem] w-full max-w-lg relative z-10 overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-8 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={tour.images[0]} alt="bg" className="w-full h-full object-cover blur-sm" />
          </div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-orange-500 font-black text-[10px] uppercase tracking-widest mb-1">Confirm Details</p>
              <h3 className="text-3xl font-black italic uppercase text-white">{tour.title}</h3>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl font-black transition-colors">&times;</button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleConfirmBooking} className="p-8 space-y-6">
          
          <div className="grid grid-cols-2 gap-6">
            {/* Travelers Input */}
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Travelers</label>
              <input 
                type="number" 
                min="1" 
                max="10" 
                value={travelers} 
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors font-bold"
              />
            </div>
            
            {/* Date Input */}
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Select Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors font-bold custom-calendar-icon"
              />
            </div>
          </div>

          {/* Bill Summary */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Base Price (x{travelers})</span>
              <span>₹{(tour.price * travelers).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Taxes & Fees</span>
              <span className="text-green-500">Included</span>
            </div>
            <div className="flex justify-between items-end pt-4 border-t border-white/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total Amount</span>
              <span className="text-3xl font-black italic text-orange-500 leading-none">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button type="submit" className="w-full bg-white text-orange-600 font-black py-4 rounded-xl uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-xl">
            Confirm & Pay Later
          </button>
        </form>

      </div>
    </div>
  );
};

export default BookingModal;