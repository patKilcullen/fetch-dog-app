import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

import SearchDogs from "./SearchDogs";
const Home = () => {
  return (
    <div>
      <SearchDogs />
    </div>
  );
};

export default Home;
