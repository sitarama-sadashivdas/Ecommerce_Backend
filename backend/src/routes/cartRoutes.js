const express = require('express');
const router = express.Router(); // Create router instance

// Import cart controller functions
const {
  addToCart,
  getCart,
  removeFromCart
} = require('../controllers/cartController');

// Import authentication middleware
const { protect } = require('../middleware/auth');

// ====================== CART ROUTES ======================

// Add item to cart
// POST /api/cart
// Protected route → user must be logged in
router.post('/', protect, addToCart);

// Get logged-in user's cart
// GET /api/cart
// Protected route → returns user's cart with populated product details
router.get('/', protect, getCart);

// Remove specific item from cart using itemId
// DELETE /api/cart/:itemId
// Protected route → removes only that specific cart item
router.delete('/:itemId', protect, removeFromCart);

// Export router to use in main server file
module.exports = router;