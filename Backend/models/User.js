const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    default: 'Traveler' // Initial default name
  },
  phone: { 
    type: String,
    default: ''
  },
  profileImage: { 
    type: String, 
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' // Default avatar
  },
  otp: { 
    type: String 
  },
  otpExpires: { 
    type: Date 
  }
}, { timestamps: true }); // createdAt aur updatedAt apne aap add ho jayega

module.exports = mongoose.model('User', userSchema);