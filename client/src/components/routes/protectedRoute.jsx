import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ component, ...rest }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  return !loading && isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
