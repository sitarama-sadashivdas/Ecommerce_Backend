const jwt = require('jsonwebtoken');     // Library to verify JWT tokens
const User = require('../models/User');  // User model (optional for extra validation)

// ====================== AUTH MIDDLEWARE (PROTECT ROUTES) ======================
exports.protect = async (req, res, next) => {
  try {
    // Debug: log Authorization header (Bearer TOKEN)
    console.log(req.headers.authorization);

    // Extract token from header
    // Format: "Bearer TOKEN" → split and take TOKEN
    const token = req.headers.authorization?.split(' ')[1];

    // If token is missing → deny access
    if (!token) {
      return res.status(401).json({ message: 'No token, access denied' });
    }

    // Verify token using secret key
    // Decodes payload (e.g., { userId: ... })
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secretkey"
    );

    req.user = decoded;

    // Proceed to next middleware/controller
    next();

  } catch (error) {
    // If token is invalid or expired → deny access
    res.status(401).json({ message: 'Invalid token' });
  }
};