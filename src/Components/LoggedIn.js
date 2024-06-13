import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import AppLayout from "./AppLayout";

const LoggedIn = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);


  if (loading) {
    return <div>Loading Puppies...</div>; 
  }

  return isAuthenticated ? (
    <AppLayout>
      <Outlet />{" "}
    </AppLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default LoggedIn;
