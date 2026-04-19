import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const ProviderDashboard = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <h1 className="text-3xl font-bold text-gray-800">Provider Dashboard</h1>
  </div>
);

const ProviderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/provider" element={<ProviderDashboard />} />
        <Route path="*" element={<Navigate to="/provider" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ProviderRoutes;