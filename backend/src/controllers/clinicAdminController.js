const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const bcrypt = require("bcryptjs");

// ---------------- CREATE DOCTOR ----------------
exports.createDoctor = async (req, res) => {
  try {
    const { name, specialization } = req.body;
    const clinicId = req.user.clinic;

    const doctor = await Doctor.create({
      name,
      specialization,
      clinic: clinicId,
    });

    res.json({ message: "Doctor created ✔️", doctor });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// ---------------- CREATE RECEPTIONIST ----------------
exports.createReceptionist = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const clinicId = req.user.clinic;

    const exists = await User.findOne({ email });
    if (exists)
      return res
        .status(400)
        .json({ message: "Email already exists ❌" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "receptionist",
      clinic: clinicId,
    });

    res.json({ message: "Receptionist created ✔️", user });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// ---------------- CREATE PATIENT ----------------
exports.createPatient = async (req, res) => {
  try {
    const { name, age, phone } = req.body;
    const clinicId = req.user.clinic;

    const patient = await Patient.create({
      name,
      age,
      phone,
      clinic: clinicId,
    });

    res.json({ message: "Patient created ✔️", patient });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// ---------------- GET DOCTORS ----------------
exports.getDoctors = async (req, res) => {
  try {
    const clinicId = req.user.clinic;
    const doctors = await Doctor.find({ clinic: clinicId });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// ---------------- GET PATIENTS ----------------
exports.getPatients = async (req, res) => {
  try {
    const clinicId = req.user.clinic;
    const patients = await Patient.find({ clinic: clinicId });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};
