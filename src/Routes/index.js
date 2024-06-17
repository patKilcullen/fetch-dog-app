import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import LoggedIn from "../Components/LoggedIn";
import Favorites from "../Components/Favorites";
import SingleDogPage from "../Components/SingleDogPage"

import Login from '../Components/login'

const AppRoutes = () => {
  return (
    <Routes>
   <Route path="/login" element={<Login />}></Route>
      {/* LOGGED IN ROUTES */}
      <Route path="/" element={<LoggedIn />}>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/dog/:id" element={<SingleDogPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;