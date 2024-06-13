import React, { createContext, useState } from "react";
import axiosInstance from "../utils/axiosConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); 

  const login = async (name, email) => {
    try {
      await axiosInstance.post("/auth/login", { name, email });
      setIsAuthenticated(true);
      setUser({ name, email }); 
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setIsAuthenticated(false);
         setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export  { AuthContext, AuthProvider };
