const mongoose = require('mongoose'); // Import mongoose

// ====================== ORDER SCHEMA ======================
const orderSchema = new mongoose.Schema({

  // Reference to the user who placed the order
  user: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
    ref: 'User',                          // Reference to User collection
  },

  // Array of ordered products
  products: [
    {
      // Reference to the product
      product: {
        type: mongoose.Schema.Types.ObjectId, // Product ID
        ref: 'Product',                       // Reference to Product collection
      },

      // Quantity of this product in the order
      quantity: Number,
    },
  ],

  // Total price of the order (calculated at order time)
  totalPrice: Number,

}, 
{
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Export Order model
module.exports = mongoose.model('Order', orderSchema);