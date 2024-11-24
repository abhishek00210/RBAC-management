const { validationResult } = require("express-validator");
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const MedicalRecord = require("../models/MedicalRecord");

/**
 * @desc Assign a patient to a doctor
 * @param {String} doctorId - ID of the doctor
 * @param {String} patientId - ID of the patient
 */
const assignPatientToDoctor = async (doctorId, patientId) => {
  try {
    const doctor = await User.findById(doctorId);
    const patient = await User.findById(patientId);

    if (!doctor || !patient) {
      console.log("Doctor or patient not found.");
      return;
    }

    if (doctor.assignedPatients.includes(patientId)) {
      console.log("Patient is already assigned to this doctor.");
      return;
    }

    doctor.assignedPatients.push(patientId);
    patient.assignedDoctor = doctorId;

    await doctor.save();
    await patient.save();

    console.log("Patient assigned to doctor successfully.");
  } catch (error) {
    console.error("Error assigning patient to doctor:", error.message);
  }
};

/**
 * @desc Create a new appointment
 * @route POST /api/appointments/:patientId
 * @access Private
 */
const createAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { doctorId, notes } = req.body;
  const { patientId } = req.params;

  try {
    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      notes,
    });

    await assignPatientToDoctor(doctorId, patientId);

    await newAppointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment created successfully.",
      data: newAppointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating an appointment.",
      error: error.message,
    });
  }
};

/**
 * @desc Get all appointments for a patient
 * @route GET /api/appointments/patient/:patientId
 * @access Private
 */
const getAppointmentsByPatientId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { patientId } = req.params;

  try {
    const appointments = await Appointment.find({ patient: patientId })
      .populate("doctor", "username email")
      .sort({ appointmentDate: 1 });

    if (appointments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No appointments found for this patient.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully.",
      data: appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching appointments.",
      error: error.message,
    });
  }
};

/**
 * @desc Get medical records for a patient
 * @route GET /api/records/patient/:patientId
 * @access Private
 */
const getRecordsByPatientId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { patientId } = req.params;

  try {
    const records = await MedicalRecord.find({ patient: patientId }) || [];

    res.status(200).json({
      success: true,
      message: "Medical records fetched successfully.",
      data: records,
    });
  } catch (error) {
    console.error("Error fetching medical records:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching medical records.",
      error: error.message,
    });
  }
};

/**
 * @desc Write a medical record for a patient
 * @route POST /api/records/patient/:patientId
 * @access Private
 */
const writeRecord = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { patientId } = req.params;
  const doctorId = req.user.id;
  const { diagnosis, treatment, notes } = req.body;

  try {
    const record = new MedicalRecord({
      patient: patientId,
      doctor: doctorId,
      diagnosis,
      treatment,
      notes,
    });

    await record.save();

    res.status(201).json({
      success: true,
      message: "Medical record created successfully.",
      data: record,
    });
  } catch (error) {
    console.error("Error writing medical record:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while writing the medical record.",
      error: error.message,
    });
  }
};

module.exports = {
  writeRecord,
  createAppointment,
  getAppointmentsByPatientId,
  getRecordsByPatientId,
};
