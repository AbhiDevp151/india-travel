const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');

// 1. GET ALL TOURS
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. GET FEATURED TOURS (For Home Page)
router.get('/featured', async (req, res) => {
  try {
    const featuredTours = await Tour.find({ featured: true }).limit(4);
    res.json(featuredTours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. THE USP ROUTE: Search by Month & Budget
// Frontend ise aise call karega: /api/tours/search?month=Oct&budget=50000
router.get('/search', async (req, res) => {
  try {
    const { month, budget } = req.query;
    
    // Default query object
    let query = {};

    // Agar budget aaya hai, toh price <= budget check karo
    if (budget) {
      query.price = { $lte: Number(budget) };
    }

    // Agar month aaya hai aur "All" nahi hai, toh check karo ki wo optimalMonths array mein ho
    if (month && month !== 'All') {
      query.optimalMonths = { $in: [month] };
    }

    const matchedTours = await Tour.find(query);
    res.json(matchedTours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. GET SINGLE TOUR DETAILS
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// ADMIN ROUTES (CRUD Operations)
// ==========================================

// 5. CREATE A NEW TOUR (Admin use)
router.post('/', async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 6. DELETE A TOUR (Admin use)
router.delete('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tour deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;