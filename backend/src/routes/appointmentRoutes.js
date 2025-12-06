const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createAppointment,
  getAppointmentsByClinic,
  getAppointmentsForDoctor,
  updateAppointmentStatus
} = require("../controllers/appointmentController");

// Create appointment → clinic admin & receptionist
router.post("/create", auth(["clinicadmin", "receptionist"]), createAppointment);

// Get all appointment for clinic (clinic admin & receptionist)
router.get("/clinic", auth(["clinicadmin", "receptionist"]), getAppointmentsByClinic);

// Get appointments for doctor (doctor only)
router.get("/doctor", auth(["doctor"]), getAppointmentsForDoctor);

// Update status (clinic admin & doctor)
router.put("/update-status", auth(["clinicadmin", "doctor"]), updateAppointmentStatus);

module.exports = router;
