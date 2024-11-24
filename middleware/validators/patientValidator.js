const { body, param } = require("express-validator");

/**
 * @desc Middleware to validate appointment creation
 * @route POST /api/appointments/:patientId
 * @access Depends on the route
 */
const validateAppointment = [
  param("patientId")
    .isMongoId()
    .withMessage("Invalid patient ID"), // Validate patientId from route parameters
  body("doctorId")
    .isMongoId()
    .withMessage("Invalid doctor ID"), // Validate doctorId in request body
  body("notes")
    .isString()
    .optional(), // Ensure notes, if provided, is a string
];

/**
 * @desc Middleware to validate patientId parameter
 * @route Various (e.g., GET /api/patients/:patientId)
 * @access Depends on the route
 */
const validatePatientId = [
  param("patientId")
    .isMongoId()
    .withMessage("Invalid patient ID"), // Validate patientId as a MongoDB ObjectId
];

/**
 * @desc Middleware to validate medical record creation
 * @route POST /api/records/:patientId
 * @access Depends on the route
 */
const validateRecord = [
  param("patientId")
    .isMongoId()
    .withMessage("Invalid patient ID"), // Validate patientId from route parameters
  body("diagnosis")
    .isString()
    .withMessage("Diagnosis is required"), // Ensure diagnosis is a string and is provided
  body("treatment")
    .isString()
    .withMessage("Treatment is required"), // Ensure treatment is a string and is provided
  body("notes")
    .isString()
    .optional(), // Ensure notes, if provided, is a string
];

module.exports = {
  validateAppointment,
  validatePatientId,
  validateRecord,
};
