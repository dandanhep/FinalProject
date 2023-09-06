// Import the Mongoose library
const mongoose = require("mongoose");

// Define a Mongoose schema for the 'User' model
const userSchema = new mongoose.Schema({
  // Define the 'username' field with a type of String, which is required and must be unique
  username: { type: String, required: true, unique: true },

  // Define the 'password' field with a type of String, which is required
  password: { type: String, required: true },

  // Define the 'isAdmin' field with a type of Boolean, which has a default value of false
  isAdmin: { type: Boolean, default: false },
});

// Create a Mongoose model named 'User' based on the defined schema
const User = mongoose.model("User", userSchema);

// Export the 'User' model to make it available for use in other parts of the application
module.exports = User;
