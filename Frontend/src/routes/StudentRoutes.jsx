import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentDashboard from "../components/Students/StudentDashboard";

const StudentRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default StudentRoutes;