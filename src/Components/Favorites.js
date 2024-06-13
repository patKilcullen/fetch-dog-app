import React, {useContext} from "react";


import { FavoritesContext } from "../context/FavoritesContext";

import SingleDog from "./SingleDog";
import FindMatch from "./FindMatch";
const Favorites = () => {

    const { favorites, removeFavorite } = useContext(FavoritesContext);
  return (
    <div>
      <h2>Favorite Dogs</h2>


      {favorites.map((dog) => (
        <div key={dog.id}>
          <SingleDog dog={dog} saved={true} />
        </div>
      ))}
      <FindMatch dogs={favorites}/>
    </div>
  );
};

export default Favorites;
