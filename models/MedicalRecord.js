const mongoose = require("mongoose");

// Define the MedicalRecord Schema
const medicalRecordSchema = new mongoose.Schema(
  {
    // Reference to the Patient (User model)
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User collection
      required: true,
    },

    // Reference to the Doctor (User model)
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User collection
      required: true,
    },

    // Diagnosis details
    diagnosis: {
      type: String,
      required: true,
      trim: true, // Automatically trims whitespace
    },

    // Treatment details
    treatment: {
      type: String,
      required: true,
      trim: true, // Automatically trims whitespace
    },

    // Optional additional notes
    notes: {
      type: String,
      trim: true, // Automatically trims whitespace
    },
  },
  {
    // Enable automatic timestamps for createdAt and updatedAt
    timestamps: true,
  }
);

// Export the MedicalRecord model
module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
