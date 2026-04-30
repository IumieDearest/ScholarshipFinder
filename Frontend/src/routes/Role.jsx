import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthRoutes from "./AuthRoutes";
import StudentRoutes from "./StudentRoutes";
import ProviderRoutes from "./ProviderRoutes";
import SchoolRoutes from "./SchoolRoutes";

const Role = () => {
  const { user } = useContext(AuthContext);

  // Check accountType from backend
  if (user && user.accountType === "Student") return <StudentRoutes />;
  if (user && user.accountType === "Provider") return <ProviderRoutes />;
  if (user && user.accountType === "School") return <SchoolRoutes />;
  if (!user) return <AuthRoutes />;

  return null;
};

export default Role;