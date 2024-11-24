const express = require("express");
const {
  writeRecord,
  createAppointment,
  getAppointmentsByPatientId,
  getRecordsByPatientId,
} = require("../controllers/patientController");
const {
  validateAppointment,
  validatePatientId,
  validateRecord,
} = require("../middleware/validators/patientValidator");
const { verifyAuth, checkPermissions } = require("../middleware/auth");

const router = express.Router();

// Create an appointment for a specific patient
router.post(
  "/patients/:patientId/appointments",
  verifyAuth,
  checkPermissions(["book_appointments"]),
  validateAppointment,
  createAppointment
);

// Get all appointments for a specific patient
router.get(
  "/patients/:patientId/appointments",
  verifyAuth,
  checkPermissions(["read_own_appointments"]),
  validatePatientId,
  getAppointmentsByPatientId
);

// Get all medical records for a specific patient
router.get(
  "/patients/:patientId/records",
  verifyAuth,
  checkPermissions(["read_own_records"]),
  validatePatientId,
  getRecordsByPatientId
);

// Write a medical record for a specific patient
router.post(
  "/patients/:patientId/records",
  verifyAuth,
  checkPermissions(["write_medical_records"]),
  validateRecord,
  writeRecord
);

module.exports = router;
