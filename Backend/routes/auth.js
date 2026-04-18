const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// --- NODEMAILER SETUP ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// --- ROUTE 1: SEND OTP (For Login/Signup) ---
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins validity

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
    }
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Login OTP for India Travel',
      text: `Welcome! Your OTP for login is: ${otp}. It is valid for 10 minutes.`
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

    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });
    if (user.otpExpires < new Date()) return res.status(400).json({ error: 'OTP Expired' });

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      user: {
        id: user._id,
        email: user.email,
        name: user.name || 'Traveler',
        phone: user.phone || '',
        profileImage: user.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
});

// --- ROUTE 3: UPDATE PROFILE (Naya Route) ---
router.put('/update-profile/:id', async (req, res) => {
  const { name, phone, profileImage } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, profileImage },
      { new: true } // Updated data return karega
    );

    if (!updatedUser) return res.status(404).json({ error: "User nahi mila" });

    res.status(200).json({
      message: "Profile updated successfully!",
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        phone: updatedUser.phone,
        profileImage: updatedUser.profileImage
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Update failed!" });
  }
});

module.exports = router;