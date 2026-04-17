const mongoose = require('mongoose');
const Tour = require('./models/Tour');
require('dotenv').config();

const sampleTours = [
  {
    title: 'Golden Triangle Explorer',
    location: 'Delhi - Agra - Jaipur',
    duration: '7 Days',
    price: 45000,
    rating: 4.9,
    difficulty: 'Easy',
    featured: true,
    optimalMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    budgetCategory: 'Explorer',
    // Naya data: Images aur Details
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80', 
      'https://images.unsplash.com/photo-1548013146-72479768bbaa?w=800&q=80'
    ],
    description: 'Experience the royalty of Rajasthan and the iconic Taj Mahal. Perfect for first-time visitors to India.',
    itinerary: [
      { day: 1, details: 'Arrival in Delhi and local sightseeing.' },
      { day: 2, details: 'Drive to Agra and sunset at Taj Mahal.' },
      { day: 3, details: 'Drive to Jaipur via Fatehpur Sikri.' }
    ]
  },
  {
    title: 'Ladakh Adventure',
    location: 'Leh - Nubra - Pangong',
    duration: '8 Days',
    price: 55000,
    rating: 4.8,
    difficulty: 'Challenging',
    featured: true,
    optimalMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
    budgetCategory: 'Explorer',
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'],
    description: 'High altitude passes, crystal clear lakes, and ancient monasteries in the cold desert.',
    itinerary: [
      { day: 1, details: 'Arrival in Leh. Rest and acclimatize.' },
      { day: 2, details: 'Local Leh sightseeing (Shanti Stupa, Magnetic Hill).' }
    ]
  },
  {
    title: 'Backpackers Goa',
    location: 'North & South Goa',
    duration: '5 Days',
    price: 15000,
    rating: 4.6,
    difficulty: 'Easy',
    featured: false,
    optimalMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    budgetCategory: 'Backpacker',
    images: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80'],
    description: 'Sun, sand, and sea. Enjoy the vibrant nightlife of North Goa and serene beaches of the South.',
    itinerary: [
      { day: 1, details: 'Arrival in North Goa. Beach hopping.' },
      { day: 2, details: 'Water sports at Baga Beach and nightlife.' }
    ]
  },
  {
    title: 'Kerala Royal Retreat',
    location: 'Munnar - Alleppey',
    duration: '6 Days',
    price: 75000,
    rating: 5.0,
    difficulty: 'Easy',
    featured: true,
    optimalMonths: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    budgetCategory: 'Luxury',
    images: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80'],
    description: 'Luxurious stay amidst tea gardens and a private houseboat cruise in the backwaters.',
    itinerary: [
      { day: 1, details: 'Arrival in Kochi. Transfer to Munnar.' },
      { day: 2, details: 'Tea estate tour and spice plantation visit.' }
    ]
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/india_travel')
  .then(async () => {
    console.log('Database connected for seeding...');
    await Tour.deleteMany(); 
    console.log('Old tours cleared.');
    
    await Tour.insertMany(sampleTours); 
    console.log('✅ New Tours Inserted Successfully!');
    process.exit(); 
  })
  .catch((err) => console.log(err));