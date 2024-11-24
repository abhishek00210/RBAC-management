const { param } = require("express-validator");

/**
 * @desc Middleware to validate the userId parameter for deletion
 * @route DELETE /api/users/:userId
 * @access Private
 */
const validateDeleteUser = [
  param("userId", "Invalid user ID").isMongoId(), // Ensures userId is a valid MongoDB ObjectId
];

module.exports = {
  validateDeleteUser,
};
