const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser } = require("../controllers/adminController");
const {
  validateDeleteUser,
} = require("../middleware/validators/adminValidator");
const { verifyAuth, checkPermissions } = require("../middleware/auth");

// Route to get all users
router.get(
  "/admin/users",
  verifyAuth, // Ensures the user is authenticated
  checkPermissions(["read_users"]), // Ensures the user has 'read_users' permission
  getAllUsers // Controller handling the request
);

// Route to delete a user
router.delete(
  "/admin/users/:userId",
  verifyAuth, // Ensures the user is authenticated
  checkPermissions(["delete_users"]), // Ensures the user has 'delete_users' permission
  validateDeleteUser, // Validates the userId parameter
  deleteUser // Controller handling the deletion logic
);

module.exports = router;
