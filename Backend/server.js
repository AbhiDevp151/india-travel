const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/india_travel')
  .then(() => console.log('✅ Database Connected Successfully!'))
  .catch((err) => console.log('❌ DB Connection Error:', err));

// --- IMPORT ROUTES ---
const tourRoutes = require('./routes/tourRoutes');
const authRoutes = require('./routes/auth');         // Naya Auth route import kiya
const bookingRoutes = require('./routes/bookings');  // Naya Booking route import kiya

// --- USE ROUTES ---
app.use('/api/tours', tourRoutes);
app.use('/api/auth', authRoutes);                    // Naya Auth route add kiya
app.use('/api/bookings', bookingRoutes);             // Naya Booking route add kiya

app.get('/', (req, res) => {
  res.send('India Travel API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});