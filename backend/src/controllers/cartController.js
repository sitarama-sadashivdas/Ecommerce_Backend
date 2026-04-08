const Cart = require('../models/Cart'); // Import Cart model

// ====================== ADD TO CART ======================
exports.addToCart = async (req, res) => {
  try {
    // Debug: check if user is coming from JWT middleware
    console.log(req.user);

    // Extract userId from token (supports both formats)
    const userId = req.user.userId || req.user.id;

    // Extract product details from request body
    const { productId, quantity } = req.body;

    // Check if cart already exists for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart exists → create a new cart
      cart = await Cart.create({
        user: userId,
        products: [{ product: productId, quantity: quantity }],
      });
    } else {
      // If cart exists → push new product into cart
      cart.products.push({ product: productId, quantity: quantity });

      // Save updated cart
      await cart.save();
    }

    // Send updated cart as response
    res.json({
      success: true,
      data: cart,
    });

  } catch (error) {
    // Log error for debugging
    console.log(error);

    // Send server error response
    res.status(500).json({ message: error.message });
  }
};

// ====================== GET CART ======================
exports.getCart = async (req, res) => {
  try {
    // Extract userId from token
    const userId = req.user.userId || req.user.id;

    // Find user's cart and populate product details
    const cart = await Cart.findOne({ user: userId })
      .populate('products.product'); // Replace product ID with full product data

    // Send cart data
    res.json({
      success: true,
      data: cart,
    });

  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};

// ====================== REMOVE FROM CART ======================
exports.removeFromCart = async (req, res) => {
  try {
    // Extract userId from token
    const userId = req.user.userId || req.user.id;

    // Get itemId from URL params (dynamic route)
    const { itemId } = req.params;

    // Find user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Return error if cart not found
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove specific item from cart
    // ⚠️ NOTE: This is currently comparing productId with itemId (potential issue)
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== itemId
    );

    // Save updated cart
    await cart.save();

    // Send updated cart
    res.json({
      success: true,
      data: cart,
    });

  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};