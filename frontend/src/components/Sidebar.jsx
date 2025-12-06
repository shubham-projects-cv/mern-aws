import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { role, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">ClinicSaaS</div>
        <div style={{ fontSize: 12, marginBottom: 12 }}>
          Role: <strong>{role}</strong>
        </div>
        <nav className="sidebar-nav">
          {/* For now simple, later we can add real navigation */}
          <a>Dashboard</a>
        </nav>
      </div>
      <div className="sidebar-footer">
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
