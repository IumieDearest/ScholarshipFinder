// src/main.jsx
//
// WHAT CHANGED: Added AuthProvider wrapper around <App />
// WHY: Every file in the app (Role.jsx, Login.jsx, etc.) needs to be
//      *inside* AuthProvider to be able to read/write the user state.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./routes/context/AuthContext"; // ← NEW

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>  
      <App />
    </AuthProvider>  
  </React.StrictMode>
);