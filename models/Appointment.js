const mongoose = require("mongoose");

// Define the Appointment Schema
const appointmentSchema = new mongoose.Schema(
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

    // Appointment status (scheduled, completed, canceled)
    status: {
      type: String,
      enum: ["scheduled", "completed", "canceled"], // Predefined options
      default: "scheduled", // Default status is "scheduled"
    },

    // Optional notes about the appointment
    notes: {
      type: String,
      trim: true, // Trims any leading/trailing whitespace
    },
  },
  {
    // Enable automatic creation and update timestamps
    timestamps: true,
  }
);

// Export the Appointment model
module.exports = mongoose.model("Appointment", appointmentSchema);
