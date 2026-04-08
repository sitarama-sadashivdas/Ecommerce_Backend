const Product = require('../models/Product'); // Import Product model

// ====================== CREATE PRODUCT ======================
exports.createProduct = async (req, res) => {
  try {
    // Create a new product using request body data
    const product = await Product.create(req.body);

    // Send success response with created product
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};

// ====================== GET ALL PRODUCTS ======================
exports.getProducts = async (req, res) => {
  try {
    // Fetch all products from database
    const products = await Product.find();

    // Send response with product list
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};

// ====================== GET PRODUCT BY ID ======================
exports.getProductById = async (req, res) => {
  try {
    // Find product using ID from URL params
    const product = await Product.findById(req.params.id);

    // If product not found → return 404
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Send product data
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};

// ====================== UPDATE PRODUCT ======================
exports.updateProduct = async (req, res) => {
  try {
    // Find product by ID and update with new data
    // { new: true } → returns updated document instead of old one
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // If product not found → return 404
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Send updated product
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};

// ====================== DELETE PRODUCT ======================
exports.deleteProduct = async (req, res) => {
  try {
    // Find product by ID and delete it
    const product = await Product.findByIdAndDelete(req.params.id);

    // If product not found → return 404
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Send success message after deletion
    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};