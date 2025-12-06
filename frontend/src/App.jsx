import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import SuperAdminDashboard from "./pages/SuperAdmin/Dashboard";
import ClinicAdminDashboard from "./pages/ClinicAdmin/Dashboard";
import DoctorDashboard from "./pages/Doctor/Dashboard";
import ReceptionistDashboard from "./pages/Receptionist/Dashboard";

function PrivateRoute({ children, allowed }) {
  const { token, role } = useContext(AuthContext);
  if (!token) return <Navigate to="/" />;
  if (!allowed.includes(role)) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/super-admin"
          element={
            <PrivateRoute allowed={["superadmin"]}>
              <SuperAdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/clinic-admin"
          element={
            <PrivateRoute allowed={["clinicadmin"]}>
              <ClinicAdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/doctor"
          element={
            <PrivateRoute allowed={["doctor", "clinicadmin"]}>
              <DoctorDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/receptionist"
          element={
            <PrivateRoute allowed={["receptionist"]}>
              <ReceptionistDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
