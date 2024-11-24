const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Route handlers
app.use("/auth", require("./routes/authRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/doctors", require("./routes/doctorsRoutes"));
app.use("/patients", require("./routes/patientsRoutes"));

module.exports = app;
