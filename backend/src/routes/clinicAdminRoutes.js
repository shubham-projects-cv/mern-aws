const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createDoctor,
  createReceptionist,
  createPatient,
  getDoctors,
  getPatients,
} = require("../controllers/clinicAdminController");

// Only Clinic Admin can create doctors & receptionists
router.post("/create-doctor", auth(["clinicadmin"]), createDoctor);
router.post("/create-receptionist", auth(["clinicadmin"]), createReceptionist);

// Clinic Admin + Receptionist can create patients
router.post("/create-patient", auth(["clinicadmin", "receptionist"]), createPatient);

// Clinic Admin + Receptionist can see doctors & patients
router.get("/doctors", auth(["clinicadmin", "receptionist"]), getDoctors);
router.get("/patients", auth(["clinicadmin", "receptionist"]), getPatients);

module.exports = router;
