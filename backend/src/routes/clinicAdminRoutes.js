const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createDoctor,
  createReceptionist,
  createPatient,
  getDoctors,
  getPatients,
} = require("../controllers/clinicAdminController");

// Only Clinic Admin can access these
router.post("/create-doctor", auth(["clinicadmin"]), createDoctor);
router.post("/create-receptionist", auth(["clinicadmin"]), createReceptionist);
router.post("/create-patient", auth(["clinicadmin"]), createPatient);

router.get("/doctors", auth(["clinicadmin"]), getDoctors);
router.get("/patients", auth(["clinicadmin"]), getPatients);

module.exports = router;
