import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const response = await axiosInstance.get("/dogs/breeds"); // Use a lightweight protected endpoint

      if (response.status === 200) {
        setIsAuthenticated(true);
       
      } else {
        setIsAuthenticated(false);

      }
    } catch (error) {
      setIsAuthenticated(false);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (name, email) => {
    try {
      const data = await axiosInstance.post("/auth/login", { name, email });

      await checkAuthStatus(); // Re-check authentication status after login
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setIsAuthenticated(false);

    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
