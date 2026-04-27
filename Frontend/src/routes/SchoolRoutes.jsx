import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SchoolDashboard from "../pages/School/SchoolDashboard";

const SchoolRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<SchoolDashboard />} />
        <Route path="/school" element={<SchoolDashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SchoolRoutes;