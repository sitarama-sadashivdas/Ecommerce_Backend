const mongoose = require('mongoose'); // Import mongoose

// ====================== USER SCHEMA ======================
const userSchema = new mongoose.Schema({

  // Name of the user
  name: {
    type: String,
  },

  // Email of the user (used for login)
  email: {
    type: String,
    unique: true, // Ensures no duplicate emails in database
  },

  // Password (will be stored in hashed form using bcrypt)
  password: {
    type: String,
  },

}, 
{
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Export User model
module.exports = mongoose.model('User', userSchema);