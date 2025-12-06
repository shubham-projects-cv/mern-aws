const Clinic = require("../models/Clinic");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ---------------- CREATE CLINIC ----------------
exports.createClinic = async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    const clinic = await Clinic.create({ name, address, phone });

    res.json({ message: "Clinic created ✔️", clinic });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// ---------------- CREATE CLINIC ADMIN ----------------
exports.createClinicAdmin = async (req, res) => {
  try {
    const { name, email, password, clinicId } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists ❌" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "clinicadmin",
      clinic: clinicId,
    });

    res.json({ message: "Clinic Admin created ✔️", user });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// ---------------- GET ALL CLINICS ----------------
exports.getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find().sort({ createdAt: -1 });
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};
