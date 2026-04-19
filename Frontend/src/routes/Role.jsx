import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import StudentsRoutes from "./StudentsRoutes";
import AuthRoutes from "./AuthRoutes";
import ProviderRoutes from "./ProvideerRoutes";

const Role = () => {
  const { user } = useContext(AuthContext);

  if (user && user.role == "student") return <StudentsRoutes />;
  if (user && user.role == "provider") return <ProviderRoutes />;
  if (!user) return <AuthRoutes />;
  return null;
};

export default Role;