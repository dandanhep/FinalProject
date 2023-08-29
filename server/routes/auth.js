const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

require("dotenv").config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Registration route
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new user with isAdmin flag based on role
    const user = new User({
      username,
      password,
      isAdmin: role === "admin",
    });

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token to use for authentication
    const tokenPayload = {
      userId: user._id,
      isAdmin: user.isAdmin, // Set the isAdmin flag from the user data
    };

    const token = jwt.sign(tokenPayload, jwtSecretKey, {
      expiresIn: "24h",
    });

    // Send the token and isAdmin flag in the response
    res.status(200).json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
