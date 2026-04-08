const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router(); // Create router instance

// Import product controller functions
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// ====================== PRODUCT ROUTES ======================

// Create a new product
// POST /api/products
// Protected route → only logged-in users (ideally admin)
router.post('/', protect, createProduct);

// ❌ BUG: Duplicate route (REMOVE THIS)
// router.post('/', createProduct);

// Get all products
// GET /api/products
// Public route → anyone can view products
router.get('/', getProducts);

// Get single product by ID
// GET /api/products/:id
router.get('/:id', getProductById);

// Update product by ID
// PUT /api/products/:id
// Should be protected (and ideally admin-only)
router.put('/:id', protect, updateProduct);

// Delete product by ID
// DELETE /api/products/:id
// Should be protected (and ideally admin-only)
router.delete('/:id', protect, deleteProduct);

// Export router
module.exports = router;