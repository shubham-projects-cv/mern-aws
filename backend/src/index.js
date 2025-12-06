require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected ✔️"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/clinic", require("./routes/clinicRoutes"));
app.use("/api/clinic-admin", require("./routes/clinicAdminRoutes"));
app.use("/api/appointment", require("./routes/appointmentRoutes"));


app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "ClinicSaaS backend is running 🚀",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running → http://localhost:${PORT}`)
);
