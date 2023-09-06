// Import the Mongoose library
const mongoose = require("mongoose");

// Define a Mongoose schema for the 'Event' model
const eventSchema = new mongoose.Schema({
  // Define the 'name' field with a type of String, which is required
  name: { type: String, required: true },

  // Define the 'description' field with a type of String, which is required
  description: { type: String, required: true },

  // Define the 'imageUrl' field with a type of String, which is required
  imageUrl: { type: String, required: true },

  // Define the 'date' field with a type of Date, which is required
  date: { type: Date, required: true }, // Add a date field
});

// Create a Mongoose model named 'Event' based on the defined schema
const Event = mongoose.model("Event", eventSchema);

// Export the 'Event' model to make it available for use in other parts of the application
module.exports = Event;
