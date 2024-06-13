import React, {useContext} from "react";


import { FavoritesContext } from "../context/FavoritesContext";

const Favorites = () => {

    const { favorites, removeFavorite } = useContext(FavoritesContext);
  return (
    <div>
      <h2>Favorite Dogs</h2>
      <ul>
        {favorites.map((dog) => (
          <li key={dog.id}>
            {dog.name}
            <button onClick={() => removeFavorite(dog.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
