import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProviderDashboard from "../pages/Provider/ProviderDashboard";

const ProviderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/providerdashboard" element={<ProviderDashboard />} />
        <Route path="/provider" element={<ProviderDashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ProviderRoutes;