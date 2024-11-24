const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    // Unique username for the user
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true, // Removes leading/trailing whitespace
    },

    // Unique email for the user
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, // Converts email to lowercase
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ], // Regex for email validation
    },

    // Hashed password
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    // Role of the user (references the Role model)
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: [true, "User role is required"],
    },

    // List of patients assigned to a doctor
    assignedPatients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References other User documents (patients)
      },
    ],

    // Doctor assigned to a patient
    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References another User document (doctor)
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Export the User model
module.exports = mongoose.model("User", userSchema);
