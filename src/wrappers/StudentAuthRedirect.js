import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const StudentAuthRedirect = ({ children }) => {
  const { state, loading } = useContext(AuthContext);
  const location = useLocation();

  if (!loading) {
    if (state.isAuthenticated && state.user !== "admin") {
      return <Navigate to="/student-view" state={{ from: location }} />;
    }
    return children;
  } else {
    return <></>;
  }
};

export default StudentAuthRedirect;
