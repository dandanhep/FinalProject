const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const authenticateUser = require("../middleware");

// Middleware to check if the user is an admin
const checkAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Permission denied" });
  }
  next();
};

// Protected route for adding a new event (admin only)
router.post("/add-event", authenticateUser, checkAdmin, async (req, res) => {
  try {
    // Check if the user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Permission denied" });
    }

    const { name, description, imageUrl } = req.body;

    // Create a new event using the Event model
    const newEvent = new Event({
      name,
      description,
      imageUrl,
    });

    // Save the new event to the database
    await newEvent.save();

    res.json({ message: "Event added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding the event" });
  }
});

// Protected route for editing an event (admin only)
router.put(
  "/edit-event/:eventId",
  authenticateUser,
  checkAdmin,
  async (req, res) => {
    try {
      // Check if the user is an admin
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Permission denied" });
      }

      const { name, description, imageUrl } = req.body;
      const eventId = req.params.eventId;

      // Find the event by ID
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Update the event details
      event.name = name;
      event.description = description;
      event.imageUrl = imageUrl;

      // Save the updated event to the database
      await event.save();

      res.json({ message: "Event updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating the event" });
    }
  }
);

// Protected route for canceling an event (admin only)
router.delete(
  "/cancel-event/:eventId",
  authenticateUser,
  checkAdmin,
  async (req, res) => {
    try {
      // Check if the user is an admin
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Permission denied" });
      }

      const eventId = req.params.eventId;

      // Find the event by ID
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Remove the event from the database
      await event.remove();

      res.json({ message: "Event canceled successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error canceling the event" });
    }
  }
);

// Fetch upcoming events
router.get("/upcoming-events", async (req, res) => {
  try {
    const upcomingEvents = await Event.find({ date: { $gte: new Date() } });
    res.json(upcomingEvents);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
