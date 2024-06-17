import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  // CHECK IF AUTHORIZED... keeps users logged in on refresh... 
  // hits dogs/breeds api to check if authorized... would ideally hit another route if more robust api
  const checkAuthStatus = async () => {
    try {
      const response = await axiosInstance.get("/dogs/breeds");
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // LOGIN
  const login = async (name, email) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        name,
        email,
      });
  if (response.status === 200) {
    setIsAuthenticated(true);
  } else {
    setIsAuthenticated(false);
  }
      return response;
    } catch (error) {
      console.error("Login failed", error);
      return error;
    }
  };
// LOGOUT
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
