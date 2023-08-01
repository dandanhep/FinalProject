const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(
      token,
      "3ahgBMAUhHW0D4yZSklhQHN8jbq3DOGMaQvUHEPvH6x1mkZMZFzjANo4dkNUpwajZNZoLHs9yDtrVyOTDSiBd8GOqu0HRBbsGt0DdEThhGZAbnrjkZUndZfhij0wklGqCOdr9oHFz1TH90EhQzvQnj5JlVRFuieiSBY9TtVVrVcluf4931KXE6fPkPRA1mCUuyCebFZdtt4cQD4TdtW2BAGpMey4j1GvOsJfvqOybEpl9aSLM1eR2xk2gPxcOoUo18cTgdDXhvXfo9JGKOXmzB8r6ztdWvsbuvOyMcZ6WviovSXxwDrFFTkaAoDoA4M"
    );
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateUser;
