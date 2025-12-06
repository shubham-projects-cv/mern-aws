const Appointment = require("../models/Appointment");

// ---------------- CREATE APPOINTMENT ----------------
exports.createAppointment = async (req, res) => {
  try {
    const clinicId = req.user.clinic;
    const { doctorId, patientId, date, time, reason } = req.body;

    const appointment = await Appointment.create({
      clinic: clinicId,
      doctor: doctorId,
      patient: patientId,
      date,
      time,
      reason
    });

    res.json({ message: "Appointment booked ✔️", appointment });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// ---------------- GET ALL APPOINTMENTS FOR CLINIC ----------------
exports.getAppointmentsByClinic = async (req, res) => {
  try {
    const clinicId = req.user.clinic;
    const appointments = await Appointment.find({ clinic: clinicId })
      .populate("doctor")
      .populate("patient")
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// ---------------- GET APPOINTMENTS FOR DOCTOR ----------------
exports.getAppointmentsForDoctor = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient")
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// ---------------- UPDATE APPOINTMENT STATUS ----------------
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    const allowedStatus = ["Booked", "Completed", "Cancelled"];
    if (!allowedStatus.includes(status))
      return res.status(400).json({ message: "Invalid status ❌" });

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    res.json({ message: "Appointment updated ✔️", appointment });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};
