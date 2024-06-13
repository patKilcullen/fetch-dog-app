import React, { createContext, useState } from "react";
import axiosInstance from "../utils/axiosConfig";

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [matches, setMatches] = useState(null)

  const addFavorite = (dog) => {
     if (!favorites.some((favorite) => favorite.id === dog.id)) {
       setFavorites([...favorites, dog]);
     }
  };

  const removeFavorite = (dogId) => {
    setFavorites(favorites.filter((dog) => dog.id !== dogId));
  };


  const getMatch = async (dogIds) => {
    try {
   const data =   await axiosInstance.post("/dogs/match", dogIds);

//    setMatches([...matches, data.match])
console.log("xdata.data.match: ", data.data.match);
  const dogResponse = await axiosInstance.post("/dogs", [data.data.match]);
  console.log("resp: ", dogResponse);

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
