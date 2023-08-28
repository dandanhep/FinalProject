const jwt = require("jsonwebtoken");
const User = require("./models/user");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, jwtSecretKey);
    req.user = decodedToken; // Store the decoded user information in the request

    // Check if the user is an admin
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: "Permission denied" });
    }

    // If user is an admin, proceed to the next middleware/route handler
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateUser;
