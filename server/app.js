const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/auth");
const authenticateUser = require("./middleware");

const DB_CONNECTION_STRING = "mongodb+srv://finalproject.s5nykoh.mongodb.net/";
const DB_NAME = "FinalProject"; // database name
const DB_USERNAME = "dhepburn97";
const DB_PASSWORD = "aUmQmEURCwX9LZBV"; // database password

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // to avoid deprecation warnings
  user: DB_USERNAME,
  pass: DB_PASSWORD,
  dbName: DB_NAME,
};

// Connect to MongoDB Atlas
mongoose
  .connect(DB_CONNECTION_STRING, options)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Protected route example
app.get("/protected-route", authenticateUser, (req, res) => {
  // This route will only be accessible if the user is authenticated with a valid token
  res.json({ message: "Protected route accessed successfully" });
});

// Start the server
const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
