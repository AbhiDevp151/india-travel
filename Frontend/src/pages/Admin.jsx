import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [tours, setTours] = useState([]);
  
  // Naya tour add karne ke liye state
  const [formData, setFormData] = useState({
    title: '', location: '', duration: '', price: '', 
    budgetCategory: 'Explorer', difficulty: 'Moderate', optimalMonths: 'Oct,Nov,Dec'
  });

  // Database se saare tours fetch karna
  const fetchTours = async () => {
    try {
      const res = await axios.get('/api/tours');
      setTours(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Form handle karna
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Naya Tour Submit karna
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mahino ko string se array mein convert kar rahe hain (USP logic ke liye)
      const payload = {
        ...formData,
        optimalMonths: formData.optimalMonths.split(',').map(m => m.trim())
      };
      
      await axios.post('/api/tours', payload);
      alert('Tour Added Successfully!');
      fetchTours(); // List ko turant refresh karo
      
      // Form reset
      setFormData({ title: '', location: '', duration: '', price: '', budgetCategory: 'Explorer', difficulty: 'Moderate', optimalMonths: 'Oct,Nov,Dec' });
    } catch (err) {
      alert('Error adding tour');
    }
  };

  // Tour Delete karna
  const handleDelete = async (id) => {
    if (window.confirm("Bhai sach mein delete karna hai?")) {
      try {
        await axios.delete(`/api/tours/${id}`);
        fetchTours(); // Delete hone ke baad list update karo
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-12 px-6 text-white selection:bg-orange-500">
      <div className="container mx-auto">
        <header className="mb-12 border-l-4 border-orange-500 pl-6">
          <h1 className="text-4xl font-black italic uppercase">Admin <span className="text-orange-500 not-italic">Control</span></h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Manage your inventory</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* LEFT SIDE: ADD TOUR FORM */}
          <div className="lg:col-span-1 bg-zinc-900 border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h2 className="text-xl font-black uppercase mb-6 text-orange-500">Add New Tour</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Tour Title (e.g., Manali Trip)" className="w-full bg-white/5 p-3 rounded-xl border border-white/10 text-sm focus:border-orange-500 outline-none" required />
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location (e.g., Himachal)" className="w-full bg-white/5 p-3 rounded-xl border border-white/10 text-sm focus:border-orange-500 outline-none" required />
              <div className="flex gap-4">
                <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (e.g., 5 Days)" className="w-1/2 bg-white/5 p-3 rounded-xl border border-white/10 text-sm focus:border-orange-500 outline-none" required />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (₹)" className="w-1/2 bg-white/5 p-3 rounded-xl border border-white/10 text-sm focus:border-orange-500 outline-none" required />
              </div>
              
              <select name="budgetCategory" value={formData.budgetCategory} onChange={handleChange} className="w-full bg-white/5 p-3 rounded-xl border border-white/10 text-sm focus:border-orange-500 outline-none text-gray-400">
                <option value="Backpacker">Backpacker</option>
                <option value="Explorer">Explorer</option>
                <option value="Luxury">Luxury</option>
              </select>

              <div>
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Optimal Months (Comma Separated)</label>
                <input type="text" name="optimalMonths" value={formData.optimalMonths} onChange={handleChange} placeholder="Jan,Feb,Mar" className="w-full bg-white/5 p-3 rounded-xl border border-white/10 text-sm focus:border-orange-500 outline-none" required />
              </div>

              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs transition-all active:scale-95 mt-4">
                Save to Database
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: TOUR LIST */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-black uppercase mb-6 text-white">Current Inventory ({tours.length})</h2>
            
            {tours.map((tour) => (
              <div key={tour._id} className="bg-zinc-900 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-orange-500/30 transition-colors">
                <div>
                  <h3 className="text-lg font-bold uppercase">{tour.title}</h3>
                  <div className="flex gap-4 text-xs text-gray-400 mt-2 font-medium">
                    <span>📍 {tour.location}</span>
                    <span className="text-orange-400 font-black">₹{tour.price}</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">{tour.budgetCategory}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleDelete(tour._id)}
                  className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all"
                >
                  Delete
                </button>
              </div>
            ))}
            
            {tours.length === 0 && (
              <div className="text-center py-20 text-gray-600 italic">No tours available. Database is empty.</div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
};

export default Admin;