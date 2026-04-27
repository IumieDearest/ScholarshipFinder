import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthRoutes from "./AuthRoutes";
import StudentRoutes from "./StudentRoutes";
import SchoolRoutes from "./SchoolRoutes";
import ProviderRoutes from "./ProviderRoutes";

const Role = () => {
  const { user } = useContext(AuthContext);

  // Check accountType from backend (NOT role)
  if (user && user.accountType === "Student") return <StudentRoutes />;
  if (user && user.accountType === "School") return <SchoolRoutes />;
  if (user && user.accountType === "Provider") return <ProviderRoutes />;
  
  // Not logged in
  if (!user) return <AuthRoutes />;

  return null;
};

export default Role;
