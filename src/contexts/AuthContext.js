import React, { createContext, useState, useEffect } from "react";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function handleAuthChange() {
      if (localStorage.getItem("isLogin") === "true") {
        if (localStorage.getItem("user") === "admin") {
          setState({
            isAuthenticated: true,
            user: "admin",
          });
        } else {
          setState({
            isAuthenticated: true,
            user: localStorage.getItem("user"),
          });
        }
      }

      setLoading(false);
    }

    handleAuthChange();
  }, []);

  return (
    <AuthContext.Provider value={{ state, loading, setState }}>
      {children}
    </AuthContext.Provider>
  );
};
