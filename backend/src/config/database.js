const mongoose = require('mongoose');

// Function to establish connection with MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect using the connection string stored in environment variables
    await mongoose.connect(process.env.MONGO_URI);

    // Log success message if connection is established
    console.log('MongoDB Connected ✅');
  } catch (error) {
    // Log the error if connection fails
    console.log(error);

    // Exit the process with failure (1) to stop the app
    process.exit(1);
  }
};

// Export the function so it can be used in server/app file
module.exports = connectDB;