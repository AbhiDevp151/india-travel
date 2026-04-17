const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// --- ROUTE 1: Create a New Booking (POST) ---
router.post('/', async (req, res) => {
  try {
    const { userId, tourId, tourName, travelDate, travelers, totalAmount } = req.body;
    
    const newBooking = new Booking({
      user: userId,
      tour: tourId,
      tourName,
      travelDate,
      travelers,
      totalAmount
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking confirmed successfully!', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking. Please try again.' });
  }
});

// --- ROUTE 2: Get Bookings for a Specific User (GET) ---
router.get('/user/:userId', async (req, res) => {
  try {
    // Latest bookings pehle dikhane ke liye sort createdAt -1 kiya hai
    const bookings = await Booking.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch booking history.' });
  }
});

module.exports = router;