import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

export default FarmerRoutes;