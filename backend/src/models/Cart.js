const mongoose = require('mongoose'); // Import mongoose

// ====================== CART SCHEMA ======================
const cartSchema = new mongoose.Schema({
  
  // Reference to the user who owns this cart
  user: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
    ref: 'User',                          // Reference to User collection
  },

  // Array of products added to cart
  products: [
    {
      // Reference to the product
      product: {
        type: mongoose.Schema.Types.ObjectId, // Product ID
        ref: 'Product',                       // Reference to Product collection
      },

      // Quantity of this product in cart
      quantity: {
        type: Number,
        default: 1, // Default quantity is 1
      },
    },
  ],

}, 
{
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Export Cart model
module.exports = mongoose.model('Cart', cartSchema);