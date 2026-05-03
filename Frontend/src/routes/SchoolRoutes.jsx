import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SchoolDashboard from "../pages/School/SchoolDashboard";
import SchoolApplicantQueue from "../pages/School/SchoolApplicantQueue";
import SchoolActiveScholarships from "../pages/School/SchoolActiveScholarships";
import SchoolSettings from "../pages/School/SchoolSettings";

const SchoolRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<SchoolDashboard />} />
        <Route path="/applicant-queue" element={<SchoolApplicantQueue />} />
        <Route path="/active-scholarships" element={<SchoolActiveScholarships />} />
        <Route path="/settings" element={<SchoolSettings />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SchoolRoutes;