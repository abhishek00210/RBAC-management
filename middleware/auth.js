const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * @desc Middleware to verify user authentication
 * @access Protected routes
 */
const verifyAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token provided. Authorization denied.",
    });
  }

  // Extract the token
  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token found in Authorization header",
    });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Fetch user details from the database
    const user = await User.findById(req.user.id).populate("role");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Authorization denied.",
      });
    }

    // Attach user to request for further use
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token. Authorization denied.",
    });
  }
};

/**
 * @desc Middleware to check user permissions
 * @param {Array} permissions - Array of required permissions
 * @access Role-based routes
 */
const checkPermissions = (permissions) => {
  return async (req, res, next) => {
    try {
      // Ensure user exists and has a role with permissions
      const user = await User.findById(req.user.id).populate("role");
      if (
        user &&
        user.role &&
        user.role.permissions.some((perm) => permissions.includes(perm))
      ) {
        return next();
      }

      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions.",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `Server error occurred: ${err.message}`,
      });
    }
  };
};

module.exports = {
  verifyAuth,
  checkPermissions,
};
