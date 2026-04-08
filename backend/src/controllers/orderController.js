const Order = require('../models/Order'); // Import Order model
const Cart = require('../models/Cart');   // Import Cart model

// ====================== PLACE ORDER ======================
exports.placeOrder = async (req, res) => {
  try {
    // Extract userId from JWT payload (supports both formats)
    const userId = req.user.userId || req.user.id;

    // Fetch user's cart and populate product details (price, etc.)
    const cart = await Cart.findOne({ user: userId })
      .populate('products.product');

    // Check if cart exists and is not empty
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // ====================== CALCULATE TOTAL ======================
    let total = 0;

    // Loop through each cart item and calculate total price
    cart.products.forEach(item => {
      total += item.product.price * item.quantity;
    });

    // ====================== CREATE ORDER ======================
    const order = await Order.create({
      user: userId,              // Reference to user
      products: cart.products,   // Copy all cart items into order
      totalPrice: total,         // Store calculated total
    });

    // ====================== CLEAR CART ======================
    // After placing order, remove all items from cart
    cart.products = [];
    await cart.save();

    // Send success response with order details
    res.json({
      success: true,
      data: order,
    });

  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};

// ====================== GET MY ORDERS ======================
exports.getMyOrders = async (req, res) => {
  try {
    // Extract userId from JWT
    const userId = req.user.userId || req.user.id;

    // Fetch all orders for this user and populate product details
    const orders = await Order.find({ user: userId })
      .populate('products.product');

    // Send response with all orders
    res.json({
      success: true,
      data: orders,
    });

  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};

// ====================== GET ORDER DETAIL ======================
exports.getOrderDetail = async (req, res) => {
  try {
    // Extract userId from JWT
    const userId = req.user.userId || req.user.id;

    // Extract dynamic orderId from URL params
    const { orderId } = req.params;

    // Find specific order and populate product details
    const order = await Order.findById(orderId)
      .populate('products.product');

    // If order does not exist → return 404
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ====================== SECURITY CHECK ======================
    // Ensure that the logged-in user owns this order
    if (order.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Send order details
    res.json({
      success: true,
      data: order,
    });

  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};