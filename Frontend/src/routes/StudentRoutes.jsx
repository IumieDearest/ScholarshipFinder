import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentFeed      from "../pages/Student/StudentFeed";
import StudentDashboard from "../pages/Student/StudentDashboard";
import Applications     from "../pages/student/Applications";
import Documents        from "../pages/student/Documents";
import StudentSettings  from "../pages/student/StudentSettings"; 

const StudentRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Feed"         element={<StudentFeed />} />
        <Route path="/dashboard"    element={<StudentDashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/documents"    element={<Documents />} />
        <Route path="/settings"     element={<StudentSettings />} />
      
        {/* Any unknown URL → go to dashboard */}
        <Route path="*" element={<Navigate to="/feed" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default StudentRoutes;