import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Email, 2 = OTP
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    try {
      const res = await axios.post('/api/auth/send-otp', { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    try {
      const res = await axios.post('/api/auth/verify-otp', { email, otp });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage('Login Successful! Redirecting...');
      
      // Thodi der mein Home/Profile par bhej do
      setTimeout(() => {
        window.location.href = '/profile'; // Seedha profile page par bhejega
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-md z-10">
        <Link to="/" className="text-gray-500 hover:text-orange-500 text-xs font-black uppercase tracking-widest mb-8 flex items-center gap-2 transition-all group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Exploration
        </Link>

        <div className="bg-zinc-900/50 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-10 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">
              Welcome <span className="text-orange-500 not-italic">Yatri</span>
            </h1>
            <p className="text-gray-500 text-sm mt-3 font-medium italic">
              {step === 1 ? 'Ready for your next Indian adventure?' : 'Enter the code sent to your email.'}
            </p>
          </div>

          {message && <p className="text-green-500 text-center text-xs font-bold mb-4">{message}</p>}
          {error && <p className="text-red-500 text-center text-xs font-bold mb-4">{error}</p>}

          {/* Form changes based on step */}
          {step === 1 ? (
            <form className="space-y-5" onSubmit={handleSendOtp}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium"
                />
              </div>
              <button disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-orange-500/20 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs mt-4 disabled:opacity-50">
                {loading ? 'Sending Code...' : 'Get OTP Code'}
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleVerifyOtp}>
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">6-Digit OTP</label>
                  <button type="button" onClick={() => setStep(1)} className="text-[9px] font-black text-gray-600 hover:text-orange-500 uppercase tracking-widest">Change Email</button>
                </div>
                <input 
                  type="text" 
                  required
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-center tracking-[1em] font-black text-xl"
                />
              </div>
              <button disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-orange-500/20 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs mt-4 disabled:opacity-50">
                {loading ? 'Verifying...' : 'Authorize & Start'}
              </button>
            </form>
          )}

          <div className="mt-10 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-zinc-900 px-4 text-gray-600 tracking-widest">Secure Login</span></div>
            </div>

            <div className="flex gap-4 justify-center">
               <button className="flex-1 flex justify-center items-center py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                  <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
               </button>
               <button className="flex-1 flex justify-center items-center py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                  <img src="https://www.svgrepo.com/show/448234/java.svg" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Java Login" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;