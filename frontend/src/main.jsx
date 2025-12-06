import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./styles/theme.css";
import "./styles/global.css";
import "./styles/theme.css";
import "./styles/layout.css";
import "./styles/table.css";
import "./styles/login.css";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
