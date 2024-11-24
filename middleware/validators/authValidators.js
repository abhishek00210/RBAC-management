const { body } = require("express-validator");

/**
 * @desc Middleware to validate login requests
 * @route POST /api/auth/login
 * @access Public
 */
const validateLogin = [
  body("email", "Please include a valid email").isEmail(), // Validate email format
  body("password", "Password is required").exists(), // Ensure password field exists
];

/**
 * @desc Middleware to validate registration requests
 * @route POST /api/auth/register
 * @access Public
 */
const validateRegister = [
  body("username", "Username is required").not().isEmpty(), // Ensure username is not empty
  body("email", "Please include a valid email").isEmail(), // Validate email format
  body(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }), // Validate password length
  body("role", "Role is required").not().isEmpty(), // Ensure role is not empty
];

module.exports = {
  validateLogin,
  validateRegister,
};
