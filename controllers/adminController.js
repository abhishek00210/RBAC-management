const User = require("../models/User");

/**
 * @desc Get all users
 * @route GET /api/users
 * @access Public
 */
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const allUsers = await User.find();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: allUsers,
    });
  } catch (err) {
    console.error("Error fetching all users:", err.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching all users",
      error: process.env.NODE_ENV === "production" ? null : err.message,
    });
  }
};

/**
 * @desc Delete a user by ID
 * @route DELETE /api/users/:userId
 * @access Private
 */
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user",
      error: process.env.NODE_ENV === "production" ? null : err.message,
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
