import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const PrivateRoute = () => {
  const authContext = useAuth();
  if(!authContext.token) return <Navigate to="/auth/login" />;
  return <Outlet />;
};