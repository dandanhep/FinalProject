const request = require("supertest");
const app = require("../app");
const User = require("../models/user");

// Test registration and login flow
describe("Authentication", () => {
  it("should register a new user", async () => {
    const newUser = {
      username: "testuser",
      password: "testpassword",
    };

    const response = await request(app).post("/auth/register").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");

    // Check if the user is saved in the database
    const user = await User.findOne({ username: newUser.username });
    expect(user).toBeTruthy();
  });

  it("should login an existing user", async () => {
    const existingUser = {
      username: "testuser",
      password: "testpassword",
    };

    const response = await request(app).post("/auth/login").send(existingUser);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  it("should return 401 Unauthorized for invalid credentials", async () => {
    const invalidUser = {
      username: "nonexistentuser",
      password: "wrongpassword",
    };

    const response = await request(app).post("/auth/login").send(invalidUser);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });
});
