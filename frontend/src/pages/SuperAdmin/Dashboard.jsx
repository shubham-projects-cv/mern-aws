import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  createClinicApi,
  createClinicAdminApi,
  getClinicsApi,
} from "../../api/clinic";

export default function SuperAdminDashboard() {
  const [clinics, setClinics] = useState([]);

  // Create Clinic form state
  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [clinicPhone, setClinicPhone] = useState("");

  // Create Clinic Admin form state
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminClinicId, setAdminClinicId] = useState("");

  const fetchClinics = async () => {
    try {
      const res = await getClinicsApi();
      setClinics(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load clinics");
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  const handleCreateClinic = async (e) => {
    e.preventDefault();
    try {
      await createClinicApi({
        name: clinicName,
        address: clinicAddress,
        phone: clinicPhone,
      });
      alert("Clinic created ✔️");
      setClinicName("");
      setClinicAddress("");
      setClinicPhone("");
      fetchClinics();
    } catch (err) {
      console.error(err);
      alert("Failed to create clinic");
    }
  };

  const handleCreateClinicAdmin = async (e) => {
    e.preventDefault();
    if (!adminClinicId) {
      alert("Please select a clinic");
      return;
    }
    try {
      await createClinicAdminApi({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        clinicId: adminClinicId,
      });
      alert("Clinic admin created ✔️");
      setAdminName("");
      setAdminEmail("");
      setAdminPassword("");
      setAdminClinicId("");
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message || "Failed to create clinic admin"
      );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title">Super Admin Dashboard</div>
        </div>

        <div className="card-grid">
          {/* Create Clinic */}
          <div className="card">
            <h3>Create Clinic</h3>
            <p className="helper-text">
              Add a new clinic with its basic details.
            </p>
            <form onSubmit={handleCreateClinic}>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Clinic Name</label>
                  <input
                    className="form-input"
                    placeholder="e.g. Sai Health Clinic"
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Address</label>
                  <input
                    className="form-input"
                    placeholder="City / Area"
                    value={clinicAddress}
                    onChange={(e) => setClinicAddress(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-input"
                    placeholder="10-digit number"
                    value={clinicPhone}
                    onChange={(e) => setClinicPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn" type="submit">
                  Save Clinic
                </button>
              </div>
            </form>
          </div>

          {/* Create Clinic Admin */}
          <div className="card">
            <h3>Create Clinic Admin</h3>
            <p className="helper-text">
              Assign an admin who will manage staff & patients for a clinic.
            </p>
            <form onSubmit={handleCreateClinicAdmin}>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Admin Name</label>
                  <input
                    className="form-input"
                    placeholder="e.g. Rahul Sharma"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Admin Email</label>
                  <input
                    className="form-input"
                    placeholder="admin@clinic.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Password</label>
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Clinic</label>
                  <select
                    className="form-input"
                    value={adminClinicId}
                    onChange={(e) => setAdminClinicId(e.target.value)}
                  >
                    <option value="">Select Clinic</option>
                    {clinics.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button className="btn" type="submit">
                  Save Clinic Admin
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Clinics Table */}
        <div className="table-wrapper" style={{ marginTop: 24 }}>
          <h3 style={{ marginBottom: 10 }}>All Clinics</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {clinics.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.address}</td>
                  <td>{c.phone}</td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {clinics.length === 0 && (
                <tr>
                  <td colSpan="4">No clinics yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
