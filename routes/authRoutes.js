const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const {
  validateLogin,
  validateRegister,
} = require("../middleware/validators/authValidators");

// Route to register a new user
router.post("/register", validateRegister, authController.register);

// Route to log in a user
router.post("/login", validateLogin, authController.login);

module.exports = router;
