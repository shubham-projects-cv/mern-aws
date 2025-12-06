import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  createDoctorApi,
  createReceptionistApi,
  createPatientApi,
  getDoctorsApi,
  getPatientsApi,
} from "../../api/clinicAdmin";
import {
  createAppointmentApi,
  getClinicAppointmentsApi,
  updateAppointmentStatusApi,
} from "../../api/appointment";

export default function ClinicAdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Doctor form
  const [doctorName, setDoctorName] = useState("");
  const [doctorSpecialization, setDoctorSpecialization] = useState("");

  // Receptionist form
  const [recName, setRecName] = useState("");
  const [recEmail, setRecEmail] = useState("");
  const [recPassword, setRecPassword] = useState("");

  // Patient form
  const [pName, setPName] = useState("");
  const [pAge, setPAge] = useState("");
  const [pPhone, setPPhone] = useState("");

  // Appointment form
  const [apptDoctorId, setApptDoctorId] = useState("");
  const [apptPatientId, setApptPatientId] = useState("");
  const [apptDate, setApptDate] = useState("");
  const [apptTime, setApptTime] = useState("");
  const [apptReason, setApptReason] = useState("");

  const fetchData = async () => {
    try {
      const d = await getDoctorsApi();
      setDoctors(d.data);

      const p = await getPatientsApi();
      setPatients(p.data);

      const a = await getClinicAppointmentsApi();
      setAppointments(a.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load doctors/patients/appointments");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDoctorCreate = async (e) => {
    e.preventDefault();
    try {
      await createDoctorApi({
        name: doctorName,
        specialization: doctorSpecialization,
      });
      alert("Doctor added ✔️");
      setDoctorName("");
      setDoctorSpecialization("");
      fetchData();
    } catch {
      alert("Failed to add doctor");
    }
  };

  const handleReceptionistCreate = async (e) => {
    e.preventDefault();
    try {
      await createReceptionistApi({
        name: recName,
        email: recEmail,
        password: recPassword,
      });
      alert("Receptionist added ✔️");
      setRecName("");
      setRecEmail("");
      setRecPassword("");
    } catch {
      alert("Failed to add receptionist");
    }
  };

  const handlePatientCreate = async (e) => {
    e.preventDefault();
    try {
      await createPatientApi({
        name: pName,
        age: pAge,
        phone: pPhone,
      });
      alert("Patient added ✔️");
      setPName("");
      setPAge("");
      setPPhone("");
      fetchData();
    } catch {
      alert("Failed to add patient");
    }
  };

  const handleAppointmentCreate = async (e) => {
    e.preventDefault();
    if (!apptDoctorId || !apptPatientId || !apptDate || !apptTime) {
      alert("Doctor, patient, date and time are required");
      return;
    }
    try {
      await createAppointmentApi({
        doctorId: apptDoctorId,
        patientId: apptPatientId,
        date: apptDate,
        time: apptTime,
        reason: apptReason,
      });
      alert("Appointment booked ✔️");
      setApptDoctorId("");
      setApptPatientId("");
      setApptDate("");
      setApptTime("");
      setApptReason("");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to book appointment");
    }
  };

  const handleStatusChange = async (appointmentId, status) => {
    try {
      await updateAppointmentStatusApi({ appointmentId, status });
      fetchData();
    } catch {
      alert("Failed to update status");
    }
  };

  const statusBadgeClass = (status) => {
    if (status === "Completed") return "badge badge-completed";
    if (status === "Cancelled") return "badge badge-cancelled";
    return "badge badge-booked";
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title">Clinic Admin Dashboard</div>
        </div>

        {/* ---------- DOCTORS ---------- */}
        <div className="card">
          <h3>Add Doctor</h3>
          <form onSubmit={handleDoctorCreate}>
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Doctor Name</label>
                <input
                  className="form-input"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="e.g. Dr. Sonali"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Specialization</label>
                <input
                  className="form-input"
                  value={doctorSpecialization}
                  onChange={(e) => setDoctorSpecialization(e.target.value)}
                  placeholder="e.g. Dermatologist"
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn">Save Doctor</button>
            </div>
          </form>
        </div>

        {/* DOCTORS TABLE */}
        <div className="table-wrapper">
          <h3>Doctors</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td>{d.specialization}</td>
                </tr>
              ))}
              {doctors.length === 0 && (
                <tr>
                  <td colSpan="2">No doctors yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ---------- RECEPTIONISTS ---------- */}
        <div className="card" style={{ marginTop: 26 }}>
          <h3>Add Receptionist</h3>
          <form onSubmit={handleReceptionistCreate}>
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Name</label>
                <input
                  className="form-input"
                  value={recName}
                  onChange={(e) => setRecName(e.target.value)}
                  placeholder="Receptionist Name"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  value={recEmail}
                  onChange={(e) => setRecEmail(e.target.value)}
                  placeholder="email@clinic.com"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Password</label>
                <input
                  className="form-input"
                  type="password"
                  value={recPassword}
                  onChange={(e) => setRecPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn">Save Receptionist</button>
            </div>
          </form>
        </div>

        {/* ---------- PATIENTS ---------- */}
        <div className="card" style={{ marginTop: 26 }}>
          <h3>Add Patient</h3>
          <form onSubmit={handlePatientCreate}>
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Patient Name</label>
                <input
                  className="form-input"
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                  placeholder="Patient Name"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Age</label>
                <input
                  className="form-input"
                  value={pAge}
                  onChange={(e) => setPAge(Number(e.target.value))}
                  placeholder="Age"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Phone</label>
                <input
                  className="form-input"
                  value={pPhone}
                  onChange={(e) => setPPhone(e.target.value)}
                  placeholder="10-digit phone"
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn">Save Patient</button>
            </div>
          </form>
        </div>

        {/* PATIENT TABLE */}
        <div className="table-wrapper" style={{ marginTop: 24 }}>
          <h3>Patients</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.phone}</td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan="3">No patients yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ---------- APPOINTMENTS ---------- */}
        <div className="card" style={{ marginTop: 26 }}>
          <h3>Book Appointment</h3>
          <form onSubmit={handleAppointmentCreate}>
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Doctor</label>
                <select
                  className="form-input"
                  value={apptDoctorId}
                  onChange={(e) => setApptDoctorId(e.target.value)}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name} ({d.specialization})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Patient</label>
                <select
                  className="form-input"
                  value={apptPatientId}
                  onChange={(e) => setApptPatientId(e.target.value)}
                >
                  <option value="">Select Patient</option>
                  {patients.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} ({p.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Date</label>
                <input
                  className="form-input"
                  type="date"
                  value={apptDate}
                  onChange={(e) => setApptDate(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Time</label>
                <input
                  className="form-input"
                  type="time"
                  value={apptTime}
                  onChange={(e) => setApptTime(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Reason</label>
                <input
                  className="form-input"
                  value={apptReason}
                  onChange={(e) => setApptReason(e.target.value)}
                  placeholder="Optional note"
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn">Book Appointment</button>
            </div>
          </form>
        </div>

        {/* APPOINTMENTS TABLE */}
        <div className="table-wrapper" style={{ marginTop: 24, marginBottom: 40 }}>
          <h3>Appointments</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th style={{ width: 180 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a._id}>
                  <td>{a.doctor?.name}</td>
                  <td>{a.patient?.name}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>
                    <span className={statusBadgeClass(a.status)}>
                      {a.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="btn"
                      style={{ background: "#16a34a" }}
                      onClick={() =>
                        handleStatusChange(a._id, "Completed")
                      }
                    >
                      Complete
                    </button>
                    <button
                      className="btn"
                      style={{ background: "#dc2626" }}
                      onClick={() =>
                        handleStatusChange(a._id, "Cancelled")
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan="6">No appointments yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
