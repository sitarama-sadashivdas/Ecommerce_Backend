/**
 * E-commerce Backend API - Main Application Entry Point
 * Handles server setup, middleware, routes, and database connection
 */

const express = require('express');
const app = express(); // Initialize Express app

// ====================== ENV CONFIG ======================
// Load environment variables from .env file
require('dotenv').config();

// ====================== DATABASE ======================
const connectDB = require('./config/database');

// Connect to MongoDB
connectDB();

// ====================== MIDDLEWARE ======================
// Parse incoming JSON requests
app.use(express.json());

// ====================== ROUTES ======================

// Import route files
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');

// Mount routes with base paths
app.use('/api/auth', authRoutes);       // Auth routes (register, login, profile)
app.use('/api/cart', cartRoutes);       // Cart routes
app.use('/api/orders', orderRoutes);   // Order routes
app.use('/api/products', productRoutes); // Product routes

// ====================== TEST ROUTE ======================
// Health check route
app.get('/', (req, res) => {
  res.send('API Running 🚀');
});

// ====================== SERVER ======================
const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});