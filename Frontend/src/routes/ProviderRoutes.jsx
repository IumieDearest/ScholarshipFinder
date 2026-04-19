import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const FarmerRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="*" element={<Navigate to="/farmer" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default FarmerRoutes;