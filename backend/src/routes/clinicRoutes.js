const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createClinic,
  createClinicAdmin,
  getClinics,
} = require("../controllers/clinicController");

// Only Super Admin can create clinic & clinic admins
router.post("/create-clinic", auth(["superadmin"]), createClinic);
router.post("/create-clinic-admin", auth(["superadmin"]), createClinicAdmin);

// Get all clinics (super admin only)
router.get("/all", auth(["superadmin"]), getClinics);

module.exports = router;
