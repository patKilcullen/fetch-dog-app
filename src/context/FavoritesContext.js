import React, { createContext, useState } from "react";
import axiosInstance from "../utils/axiosConfig";

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [matches, setMatches] = useState(null);

  // ADD FAVORITE
  const addFavorite = (dog) => {
    if (!favorites.some((favorite) => favorite.id === dog.id)) {
      setFavorites([...favorites, dog]);
    }
  };

  // REMOVE FAVORITE
  const removeFavorite = (dogId) => {
    setFavorites(favorites.filter((dog) => dog.id !== dogId));
  };

  // GET MATCH: hit match api w/ array of dog ids, then hit /dogs api w/reponse to get dog object
  const getMatch = async (dogIds) => {
    try {
      const data = await axiosInstance.post("/dogs/match", dogIds);

      const dogResponse = await axiosInstance.post("/dogs", [data.data.match]);

      setMatches(dogResponse.data[0]);
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
