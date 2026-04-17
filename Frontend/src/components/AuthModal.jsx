import React, { useState } from 'react';
import axios from 'axios';

const AuthModal = ({ onClose, onLoginSuccess }) => {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // --- STEP 1: Send Email OTP ---
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await axios.post('/api/auth/send-otp', { email });
      setMessage(res.data.message); // "OTP sent successfully!"
      setStep(2); // OTP wale form par jao
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 2: Verify OTP ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await axios.post('/api/auth/verify-otp', { email, otp });
      
      // Token ko LocalStorage mein save karo taaki user logged in rahe
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      setMessage('Login Successful! Redirecting...');
      
      // Parent component ko batao ki login ho gaya
      setTimeout(() => {
        onLoginSuccess(res.data.user);
        onClose();
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Box */}
      <div className="bg-zinc-950 border border-white/10 rounded-[2.5rem] w-full max-w-md relative z-10 p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-3xl font-black italic uppercase text-white">Welcome</h3>
            <p className="text-orange-500 font-bold text-[10px] uppercase tracking-widest mt-1">
              {step === 1 ? 'Login or Create Account' : 'Verify Your Email'}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl font-black">&times;</button>
        </div>

        {/* Message & Error Display */}
        {message && <p className="text-green-500 text-xs font-bold mb-4">{message}</p>}
        {error && <p className="text-red-500 text-xs font-bold mb-4">{error}</p>}

        {/* Form */}
        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors font-bold"
                placeholder="yatri@example.com"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-orange-600 text-white font-black py-4 rounded-xl uppercase tracking-widest hover:bg-orange-500 transition-all disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Get OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Enter 6-Digit OTP</label>
              <input 
                type="text" 
                required
                maxLength="6"
                value={otp} 
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors font-bold tracking-[0.5em] text-center text-xl"
                placeholder="------"
              />
              <p className="text-[10px] text-gray-500 mt-2 text-center">OTP sent to {email}</p>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-orange-600 font-black py-4 rounded-xl uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
            <button 
              type="button" 
              onClick={() => setStep(1)} 
              className="w-full text-gray-500 text-xs font-bold uppercase hover:text-white transition-colors"
            >
              Change Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;