const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/auth");
const authenticateUser = require("./middleware");
const cors = require("cors"); // Import the cors middleware

const DB_CONNECTION_STRING =
  "mongodb+srv://conferenceapp.yytqua6.mongodb.net/<conference_app>";
const DB_USERNAME = "dhepburn97";
const DB_PASSWORD = "7HTyqOzzZowNAXL6";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
  user: DB_USERNAME,
  pass: DB_PASSWORD,
};

// Connect to MongoDB Atlas
mongoose
  .connect(DB_CONNECTION_STRING, options)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Middleware
app.use(express.json());

// Use the cors middleware
app.use(cors());

// Routes
app.use("/auth", authRoutes);

// Protected route example
app.get("/protected-route", authenticateUser, (req, res) => {
  // This route will only be accessible if the user is authenticated with a valid token
  res.json({ message: "Protected route accessed successfully" });
});

// Endpoint to fetch upcoming events
app.get("/api/upcoming-events", (req, res) => {
  // Use the mongoose model to query the database and retrieve upcoming events
  Event.find() // Assuming "Event" is your mongoose model for events
    .then((upcomingEvents) => {
      res.json(upcomingEvents); // Send the retrieved events as the response
    })
    .catch((error) => {
      console.error("Error fetching upcoming events:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Start the server
const port = 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
