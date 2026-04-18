import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Edit States
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', profileImage: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || '',
        phone: parsedUser.phone || '',
        profileImage: parsedUser.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
      });
      fetchMyBookings(parsedUser.id || parsedUser._id);
    }
  }, [navigate]);

  const fetchMyBookings = async (userId) => {
    try {
      const res = await axios.get(`/api/bookings/user/${userId}`);
      setBookings(res.data);
    } catch (error) {
      console.error("Bookings lane mein dikkat aayi:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  // Profile Update Logic
  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/api/auth/update-profile/${user.id || user._id}`, formData);
      const updatedData = res.data.user;
      
      // LocalStorage aur State dono update karo
      localStorage.setItem('user', JSON.stringify(updatedData));
      setUser(updatedData);
      setIsEditing(false);
      alert("Profile updated successfully! 🔥");
    } catch (err) {
      console.error(err);
      alert("Update fail ho gaya bhai!");
    }
  };

  if (!user) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white italic">Loading...</div>;

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 pb-32 font-sans selection:bg-orange-500 relative">
      <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12 border-l-4 border-orange-500 pl-6">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">My <span className="text-orange-500">Dashboard</span></h1>
          <p className="text-gray-400 font-medium italic mt-2">Manage your travels and profile</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT: Profile Card */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-orange-500/20 to-red-600/20" />
              
              <div className="relative z-10 flex flex-col items-center">
                <img 
                  src={formData.profileImage} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full border-4 border-zinc-900 shadow-xl object-cover mb-4 ring-2 ring-orange-500/50"
                />
                
                {isEditing ? (
                  <div className="w-full space-y-4 mt-4">
                    <input 
                      type="text" 
                      placeholder="Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-500 font-bold"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Phone Number"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-500 font-bold"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Profile Image URL"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] outline-none focus:border-orange-500 font-bold"
                      value={formData.profileImage}
                      onChange={(e) => setFormData({...formData, profileImage: e.target.value})}
                    />
                    <div className="flex gap-2">
                      <button onClick={handleUpdate} className="flex-1 bg-orange-600 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Save</button>
                      <button onClick={() => setIsEditing(false)} className="flex-1 bg-white/10 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-black uppercase tracking-tight">{user.name || 'Traveler'}</h2>
                    <p className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-6">{user.email}</p>

                    <div className="w-full space-y-3 mb-8">
                      <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-left">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">Phone</p>
                        <p className="font-bold text-sm text-white">{user.phone || 'Not Added'}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setIsEditing(true)}
                      className="w-full bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 text-white font-black py-4 rounded-2xl uppercase tracking-widest transition-all text-xs"
                    >
                      Update Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: REAL Booking History */}
          <div className="lg:col-span-8">
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 md:p-12 h-full shadow-2xl overflow-hidden">
              <div className="flex justify-between items-end mb-8">
                <h3 className="text-3xl font-black italic uppercase">Travel <span className="text-orange-500">History</span></h3>
                <span className="bg-orange-500/10 text-orange-500 border border-orange-500/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {bookings.length} Trips
               </span>
              </div>

              {loadingBookings ? (
                <div className="text-center py-20 text-gray-400 font-bold italic">Fetching your adventures...</div>
              ) : (
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {bookings.length > 0 ? bookings.map((booking, i) => (
                    <div key={booking._id || i} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-orange-500/50 transition-colors group">
                      <div className="flex-1 w-full">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                            ID: {booking._id?.substring(0, 8).toUpperCase()}
                          </p>
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-500 border border-green-500/20' : 'bg-orange-500/20 text-orange-400 border border-orange-500/20'}`}>
                            {booking.status}
                          </span>
                        </div>
                        <h4 className="text-xl font-black uppercase group-hover:text-orange-500 transition-colors">{booking.tourName}</h4>
                        <p className="text-sm text-gray-400 font-medium mt-1">Travel Date: <span className="text-white">{booking.travelDate}</span></p>
                      </div>
                      
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{booking.travelers} Travelers</p>
                        <p className="text-2xl font-black italic text-orange-500">₹{booking.totalAmount?.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                      <p className="text-gray-500 italic mb-4">No trips booked yet.</p>
                      <Link to="/" className="text-orange-500 font-black uppercase text-xs tracking-widest hover:underline border-b border-orange-500 pb-1">Explore Tours</Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default UserProfile;