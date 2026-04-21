import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentFeed      from "../components/Students/StudentFeed";
import StudentDashboard from "../components/Students/StudentDashboard";
import Applications     from "../pages/student/Applications";
import Documents        from "../pages/student/Documents";
import Eligibility      from "../pages/student/Eligibility";

const StudentRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Feed"         element={<StudentFeed />} />
        <Route path="/dashboard"    element={<StudentDashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/documents"    element={<Documents />} />
        <Route path="/eligibility"  element={<Eligibility />} />

        {/* Any unknown URL → go to dashboard */}
        <Route path="*" element={<Navigate to="/feed" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default StudentRoutes;