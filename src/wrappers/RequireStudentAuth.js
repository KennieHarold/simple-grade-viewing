import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const RequireStudentAuth = ({ children }) => {
  const { state, loading } = useContext(AuthContext);
  const location = useLocation();

  if (!loading) {
    if (state.isAuthenticated && state.user !== "admin") {
      return children;
    }
    return <Navigate to="/" state={{ from: location }} />;
  } else {
    return <></>;
  }
};

export default RequireStudentAuth;
