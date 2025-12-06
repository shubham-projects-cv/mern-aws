import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  createPatientApi,
  getDoctorsApi,
  getPatientsApi,
} from "../../api/clinicAdmin";
import {
  createAppointmentApi,
  getClinicAppointmentsApi,
  updateAppointmentStatusApi,
} from "../../api/appointment";

export default function ReceptionistDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

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
      alert("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    } catch {
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
          <div className="topbar-title">Receptionist Dashboard</div>
        </div>

        {/* ---------- PATIENTS ---------- */}
        <div className="card">
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

        <div className="table-wrapper" style={{ marginTop: 20 }}>
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

function statusBadgeClass(status) {
  if (status === "Completed") return "badge badge-completed";
  if (status === "Cancelled") return "badge badge-cancelled";
  return "badge badge-booked";
}
