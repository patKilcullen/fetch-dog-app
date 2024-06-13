import React, {useContext, useState} from "react";

import { FavoritesContext } from "../context/FavoritesContext";


const SingleDog = ({dog, saved, match}) => {
   const { addFavorite, removeFavorite } = useContext(FavoritesContext);
   const [disableSave, setDisableSave] = useState(false)

   

    const handleSaveDog = () =>{
          addFavorite(dog);
          setDisableSave(true)
    }
    const handleRemoveDog = () => {
      removeFavorite(dog.id);

    };

  return (
    <div>
      <h1>{dog.name}</h1>
      <img src={dog.img} alt={dog.name} />
      <div>{dog.breed}</div>
      <div>Age: {dog.age}</div>
      <div>Zip: {dog.zip_code}</div>
      {!saved ? <button onClick={handleSaveDog} disabled={disableSave}>Save</button>
      :<button onClick={handleRemoveDog}>Remove</button>}
      
    </div>
  );};

export default SingleDog;
