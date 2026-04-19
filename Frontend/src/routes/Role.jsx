import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";
import BusinessRoutes from "./BusinessRoutes";

const Role = () => {
  const { user } = useContext(AuthContext);

  if (user && user.role == "traveler") return <UserRoutes />;
  if (user && user.role == "business") return <BusinessRoutes />;
  if (!user) return <AuthRoutes />;
  return null;
};

export default Role;