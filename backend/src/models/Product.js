const mongoose = require('mongoose'); // Import mongoose

// ====================== PRODUCT SCHEMA ======================
const productSchema = new mongoose.Schema({

  // Name of the product
  name: {
    type: String,
    required: true, // Product name is mandatory
  },

  // Price of the product
  price: {
    type: Number,
    required: true, // Price is mandatory
  },

  // Description of the product (optional)
  description: String,

  // Category of the product (optional, e.g., Electronics, Clothing)
  category: String,

}, 
{
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Export Product model
module.exports = mongoose.model('Product', productSchema);