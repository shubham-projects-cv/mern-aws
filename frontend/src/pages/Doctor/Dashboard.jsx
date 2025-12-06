import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getDoctorsApi } from "../../api/clinicAdmin";
import {
  getClinicAppointmentsApi,
  updateAppointmentStatusApi,
} from "../../api/appointment";

export default function DoctorDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");

  const fetchData = async () => {
    try {
      const d = await getDoctorsApi();
      setDoctors(d.data);
      const a = await getClinicAppointmentsApi();
      setAppointments(a.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load doctor's data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const filteredAppointments = selectedDoctorId
    ? appointments.filter(
        (a) => a.doctor && a.doctor._id === selectedDoctorId
      )
    : appointments;

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title">Doctor View</div>
        </div>

        <div className="card">
          <h3>Filter by Doctor</h3>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">Doctor</label>
              <select
                className="form-input"
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
              >
                <option value="">All Doctors</option>
                {doctors.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name} ({d.specialization})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="table-wrapper" style={{ marginTop: 20 }}>
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
              {filteredAppointments.map((a) => (
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
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan="6">No appointments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
