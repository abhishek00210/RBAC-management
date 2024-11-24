const { param } = require("express-validator");

/**
 * @desc Middleware to validate doctorId parameter in routes
 * @route Various (e.g., GET /api/doctors/:doctorId)
 * @access Depends on the specific route
 */
const validateDoctorId = [
  param("doctorId")
    .isMongoId() // Ensures the doctorId is a valid MongoDB ObjectId
    .withMessage("Invalid doctor ID"), // Custom error message for invalid ID
];

module.exports = {
  validateDoctorId,
};
