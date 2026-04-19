import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthRoutes from "./AuthRoutes";           // shown when NOT logged in
import StudentRoutes from "./StudentRoutes";     // ← FIXED (was StudentsRoutes)
import ProviderRoutes from "./ProviderRoutes";   // ← FIXED (was ProvideerRoutes)

const Role = () => {
  const { user } = useContext(AuthContext);

  if (user && user.role === "student")  return <StudentRoutes />;
  if (user && user.role === "provider") return <ProviderRoutes />;
  if (!user) return <AuthRoutes />;

  return null;
};

export default Role;