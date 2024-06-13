import React, { createContext, useState } from "react";
import axiosInstance from "../utils/axiosConfig";

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [matches, setMatches] = useState([])

  const addFavorite = (dog) => {
    setFavorites([...favorites, dog]);
  };

  const removeFavorite = (dogId) => {
    setFavorites(favorites.filter((dog) => dog.id !== dogId));
  };


  const getMatch = async (name, email) => {
    try {
   const match =   await axiosInstance.post("/dogs/match", { dogIds});

   setMatches([...matches, match])


    } catch (error) {
      console.error("getMatch failed", error);
    }
  };
  

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, getMatch, matches }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext, FavoritesProvider };
