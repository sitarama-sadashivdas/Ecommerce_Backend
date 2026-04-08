const express = require('express');
const router = express.Router(); // Create router instance

// Import controller functions
const { getUserProfile } = require("../controllers/authController");
const { register, login } = require('../controllers/authController');

// Import authentication middleware
const { protect } = require("../middleware/auth");

// Debug: log imported functions to ensure they are loaded correctly
console.log("DEBUG:", register, login, getUserProfile, protect);

// ====================== AUTH ROUTES ======================

// Register a new user
// POST /api/auth/register
router.post('/register', register);

// Login user and return JWT token
// POST /api/auth/login
router.post('/login', login);

// Get logged-in user's profile (protected route)
// GET /api/auth/profile
// Requires valid JWT token → handled by 'protect' middleware
router.get('/profile', protect, getUserProfile);

// Export router to use in main app (app.js/server.js)
module.exports = router;