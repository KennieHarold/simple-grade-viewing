import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AdminAuthRedirect = ({ children }) => {
  const { state, loading } = useContext(AuthContext);
  const location = useLocation();

  if (!loading) {
    if (state.isAuthenticated && state.user === "admin") {
      return <Navigate to="/admin" state={{ from: location }} />;
    }
    return children;
  } else {
    return <></>;
  }
};

export default AdminAuthRedirect;
