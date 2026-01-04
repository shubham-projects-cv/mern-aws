import { useState, useContext } from "react";
import { loginApi } from "../api/auth";
import "../styles/form.css";
import "../styles/layout.css";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi(email, password);
      login(res.data.token, res.data.role);

      // Redirect by role
      if (res.data.role === "superadmin") window.location.href = "/super-admin";
      if (res.data.role === "clinicadmin") window.location.href = "/clinic-admin";
      if (res.data.role === "doctor") window.location.href = "/doctor";
      if (res.data.role === "receptionist") window.location.href = "/receptionist";
    } catch {
      alert("Invalid login, please try again");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Clinic SaaS</h2>
        <p className="login-subtitle">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" type="submit">Login</button>
        </form>

        <p className="login-footer">Powered By MERN + AWS + Bootstrap</p>
      </div>
    </div>
  );
}
