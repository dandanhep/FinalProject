const request = require("supertest");
const app = require("../app");
const Event = require("../models/event");
const User = require("../models/user");

// Test /events routes
describe("/events", () => {
  let authToken;

  // Create a user and get an authentication token for testing protected routes
  beforeAll(async () => {
    const newUser = {
      username: "testadmin",
      password: "testadminpassword",
      isAdmin: true,
    };
    await User.create(newUser);

    const response = await request(app).post("/auth/login").send(newUser);
    authToken = response.body.token;
  });

  it("should add a new event", async () => {
    const newEvent = {
      name: "Test Event",
      description: "A test event",
      imageUrl: "https://example.com/test-event.jpg",
    };

    const response = await request(app)
      .post("/events/add-event")
      .set("Authorization", authToken)
      .send(newEvent);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Event added successfully");

    // Check if the event is saved in the database
    const event = await Event.findOne({ name: newEvent.name });
    expect(event).toBeTruthy();
  });

  it("should edit an existing event", async () => {
    const existingEvent = await Event.findOne();

    const updatedEvent = {
      name: "Updated Event Name",
      description: "Updated event description",
      imageUrl: "https://example.com/updated-event.jpg",
    };

    const response = await request(app)
      .put(`/events/edit-event/${existingEvent._id}`)
      .set("Authorization", authToken)
      .send(updatedEvent);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Event updated successfully");

    // Check if the event details are updated in the database
    const event = await Event.findById(existingEvent._id);
    expect(event.name).toBe(updatedEvent.name);
    expect(event.description).toBe(updatedEvent.description);
    expect(event.imageUrl).toBe(updatedEvent.imageUrl);
  });

  it("should cancel an existing event", async () => {
    const existingEvent = await Event.findOne();

    const response = await request(app)
      .delete(`/events/cancel-event/${existingEvent._id}`)
      .set("Authorization", authToken);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Event canceled successfully");

    // Check if the event is removed from the database
    const event = await Event.findById(existingEvent._id);
    expect(event).toBeFalsy();
  });
});
