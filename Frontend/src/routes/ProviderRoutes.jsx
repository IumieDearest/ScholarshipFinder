import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProviderDashboard from "../pages/Provider/ProviderDashboard";
import ProviderApplicantQueue from "../pages/Provider/ProviderApplicantQueue";
import ProviderActiveScholarships from "../pages/Provider/ProviderActiveScholarships";
import ProviderSettings from "../pages/Provider/ProviderSettings";

const ProviderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<ProviderDashboard />} />
        <Route path="/applicant-queue" element={<ProviderApplicantQueue />} />
        <Route path="/active-scholarships" element={<ProviderActiveScholarships />} />
        <Route path="/settings" element={<ProviderSettings />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ProviderRoutes;