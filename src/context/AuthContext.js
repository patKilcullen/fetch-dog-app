// import React, { createContext, useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosConfig";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const login = async (name, email) => {
//     try {
//         //  const data = await axiosInstance.post("/dogs/breeds");
//     const data =  await axiosInstance.post("/auth/login", { name, email });
//      debugger
//       setIsAuthenticated(true);
//       setUser({ name, email });
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   const logout = async () => {
//     try {
//       await axiosInstance.post("/auth/logout");
//       setIsAuthenticated(false);
//          setUser(null);
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export  { AuthContext, AuthProvider };

import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const response = await axiosInstance.get("/dogs/breeds"); // Use a lightweight protected endpoint

      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(null); // Dummy user info; adjust based on actual data
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
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
 debugger
      await checkAuthStatus(); // Re-check authentication status after login
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setIsAuthenticated(false);
      setUser(null); // Clear user details
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
