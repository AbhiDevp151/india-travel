const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// --- NODEMAILER SETUP ---
const transporter = nodemailer.createTransport({
  service: 'gmail', // Google ka server use karenge
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// --- ROUTE 1: SEND OTP ---
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  try {
    // 1. 6-digit random OTP generate karo
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

    // 2. Database mein User dhundo, agar nahi hai toh naya banao (Upsert)
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
    }
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // 3. Email bhejo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Login OTP for India Travel',
      text: `Welcome! Your OTP for login is: ${otp}. It is valid for 10 minutes. Do not share it with anyone.`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// --- ROUTE 2: VERIFY OTP ---
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    // Validations
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });
    if (user.otpExpires < new Date()) return res.status(400).json({ error: 'OTP Expired' });

    // OTP match ho gaya, ab usko clear kar do database se
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // JWT Token generate karo (Session maintain karne ke liye)
    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' } // 7 din tak login rahega
    );

    // Frontend ko token aur user data bhej do
    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profileImage: user.profileImage
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

module.exports = router;