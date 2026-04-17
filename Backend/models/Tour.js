const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 4.5 },
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging'], default: 'Moderate' },
  featured: { type: Boolean, default: false },
  
  // TERA USP FIELDS:
  optimalMonths: [{ type: String }], // Array of months e.g., ["Oct", "Nov", "Dec"]
  budgetCategory: { type: String, enum: ['Backpacker', 'Explorer', 'Luxury'] }, // The Experience
  
  images: [{ type: String }], // Array of image URLs
  description: { type: String },
  itinerary: [{ day: Number, details: String }] // Day-wise plan
}, {
  timestamps: true
});

module.exports = mongoose.model('Tour', tourSchema);