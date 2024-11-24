const mongoose = require("mongoose");

// Define the Role Schema
const RoleSchema = new mongoose.Schema(
  {
    // Role name (e.g., "Admin", "Doctor", "Patient")
    name: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate role names
      trim: true, // Removes extra whitespace
    },

    // Array of permissions assigned to the role
    permissions: {
      type: [String], // Array of permission strings (e.g., ["read", "write", "delete"])
      required: true,
      validate: {
        validator: (array) => array.length > 0, // Ensures at least one permission is provided
        message: "At least one permission is required",
      },
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Export the Role model
module.exports = mongoose.model("Role", RoleSchema);
