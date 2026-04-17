const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  tour: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tour', 
    required: true 
  },
  tourName: { 
    type: String, 
    required: true 
  },
  travelDate: { 
    type: String, 
    required: true 
  },
  travelers: { 
    type: Number, 
    required: true 
  },
  totalAmount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    default: 'Confirmed' // Status 'Confirmed', 'Completed', ya 'Cancelled' ho sakta hai
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);