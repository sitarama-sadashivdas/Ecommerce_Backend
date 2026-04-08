const express = require('express');
const router = express.Router(); // Create router instance

// Import order controller functions
const {
  placeOrder,
  getMyOrders,
  getOrderDetail
} = require('../controllers/orderController');

// Import authentication middleware
const { protect } = require('../middleware/auth');

// ====================== ORDER ROUTES ======================

// Place a new order
// POST /api/orders
// Protected route → user must be logged in
// Takes cart data from DB and creates a new order
router.post('/', protect, placeOrder);

// Get all orders of logged-in user
// GET /api/orders
// Protected route → returns user's order history
router.get('/', protect, getMyOrders);

// Get details of a specific order
// GET /api/orders/:orderId
// Protected route → returns only if user owns the order
router.get('/:orderId', protect, getOrderDetail);

// Export router to use in main server file
module.exports = router;