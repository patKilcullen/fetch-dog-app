import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import AppLayout from "./AppLayout";

// LOGGED IN COMPONENT: to hold logged in routes/componenets
const LoggedIn = () => {
  const { isAuthenticated } = useContext(AuthContext);


  return isAuthenticated ? (
    <AppLayout>
      <Outlet />{" "}
    </AppLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default LoggedIn;
