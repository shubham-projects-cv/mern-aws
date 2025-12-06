const router = require("express").Router();
const { signupSuperAdmin, login } = require("../controllers/authController");

// Super Admin signup — only allowed once
router.post("/signup-superadmin", signupSuperAdmin);

// Login
router.post("/login", login);

module.exports = router;
