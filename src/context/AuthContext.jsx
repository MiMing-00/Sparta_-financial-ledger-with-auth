import axios from "axios";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const token = localStorage.getItem("accessToken");

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
    console.log("User logged in:", true);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    console.log("User logged out:", false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
