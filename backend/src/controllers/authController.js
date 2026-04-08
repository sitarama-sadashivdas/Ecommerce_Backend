/**
 * Authentication Controller - User Registration, Login & Profile Management
 * @file Handles JWT authentication and bcrypt password hashing
 */

const User = require('../models/User'); // Import User model (MongoDB schema)
const bcrypt = require('bcryptjs');     // Library for hashing passwords securely
const jwt = require('jsonwebtoken');    // Library for generating authentication tokens

// ====================== REGISTER ======================
exports.register = async (req, res) => {
  try {
    // Log incoming request body (useful for debugging)
    console.log(req.body);

    // Destructure user input from request body
    const { name, email, password } = req.body;

    // Check if user already exists with the same email
    const userExists = await User.findOne({ email });
    if (userExists) {
      // Return error if duplicate user found
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving to database
    // "10" is the salt rounds (higher = more secure but slower)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in database with hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Send success response with created user data
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });

  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};

// ====================== LOGIN ======================
exports.login = async (req, res) => {
  try {
    // Extract login credentials from request body
    const { email, password } = req.body;

    // Check if user exists in database
    const user = await User.findOne({ email });
    if (!user) {
      // Return error if user not found
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Return error if password does not match
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with userId payload
    const token = jwt.sign(
      { userId: user._id },                    // Payload (data inside token)
      process.env.JWT_SECRET || "secretkey",   // Secret key for signing token
      { expiresIn: '7d' }                      // Token expiration time
    );

    // Send token in response (used for authentication in future requests)
    res.json({
      success: true,
      token,
    });

  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};

// ====================== PROFILE ======================
exports.getUserProfile = async (req, res) => {
  try {
    // Return user data (usually set by auth middleware after verifying JWT)
    res.json(req.body);

    // ⚠️ NOTE:
    // Ideally, this should return req.user instead of req.body
    // because req.user comes from decoded JWT (secure source)

  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};