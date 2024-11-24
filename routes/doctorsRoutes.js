const express = require("express");
const router = express.Router();
const { verifyAuth, checkPermissions } = require("../middleware/auth");
const {
  getAllPatientsByDoctorId,
  getAppointmentsByDoctorId,
} = require("../controllers/doctorController");
const {
  validateDoctorId,
} = require("../middleware/validators/doctorValidator");

// Get all appointments for a specific doctor
router.get(
  "/doctors/:doctorId/appointments",
  verifyAuth,
  checkPermissions(["manage_appointments"]),
  validateDoctorId,
  getAppointmentsByDoctorId
);

// Get all patients assigned to a specific doctor
router.get(
  "/doctors/:doctorId/patients",
  verifyAuth,
  checkPermissions(["read_assigned_patients"]),
  validateDoctorId,
  getAllPatientsByDoctorId
);

module.exports = router;
