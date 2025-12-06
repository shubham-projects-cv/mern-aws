const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, clinic: user.clinic },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// -------------------- SIGNUP SUPERADMIN --------------------
exports.signupSuperAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if a super admin already exists
    const existing = await User.findOne({ role: "superadmin" });
    if (existing)
      return res.status(400).json({
        message: "Super Admin already exists ❌",
      });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "superadmin",
      clinic: null,
    });

    res.json({ message: "Super Admin created ✔️" });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// -------------------- LOGIN --------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials ❌" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials ❌" });

    const token = generateToken(user);

    res.json({
      message: "Login successful ✔️",
      token,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};
