const { validationResult } = require("express-validator");
const Appointment = require("../models/Appointment");
const User = require("../models/User");

/**
 * @desc Get appointments by doctor ID
 * @route GET /api/appointments/doctor/:doctorId
 * @access Private
 */
const getAppointmentsByDoctorId = async (req, res) => {
  // Validate incoming request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { doctorId } = req.params;

  try {
    // Fetch appointments for the given doctor ID
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient", "username email")
      .sort({ appointmentDate: 1 });

    // Check if any appointments exist
    if (appointments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No appointments found for this doctor.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      appointmentsCount: appointments.length,
      data: appointments,
    });
  } catch (err) {
    console.error("Error fetching appointments by doctor ID:", err.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching appointments",
      error: process.env.NODE_ENV === "production" ? null : err.message,
    });
  }
};

/**
 * @desc Get all patients assigned to a doctor by doctor ID
 * @route GET /api/doctors/:doctorId/patients
 * @access Private
 */
const getAllPatientsByDoctorId = async (req, res) => {
  // Validate incoming request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { doctorId } = req.params;

  try {
    // Fetch the doctor by ID
    const doctor = await User.findById(doctorId);

    // Check if the doctor exists
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    // Get assigned patients or default to an empty array
    const patients = doctor.assignedPatients || [];

    res.status(200).json({
      success: true,
      message: "Patients fetched successfully",
      data: patients,
    });
  } catch (err) {
    console.error("Error fetching patients by doctor ID:", err.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching patients",
      error: process.env.NODE_ENV === "production" ? null : err.message,
    });
  }
};

module.exports = {
  getAppointmentsByDoctorId,
  getAllPatientsByDoctorId,
};
