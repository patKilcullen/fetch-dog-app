import React, {useContext, useState, useEffect} from "react";

import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";


const SingleDog = ({dog, saved, match}) => {
   const { addFavorite, removeFavorite, favorites } = useContext(FavoritesContext);
   const [disableSave, setDisableSave] = useState(false)
   const [isFavorite, setIsFavorite] = useState(false)
 


   useEffect(()=>{
    if(favorites.some((favorite) => favorite.id === dog.id)){

        setIsFavorite(true)
    }

   },[favorites])

    const handleSaveDog = () =>{
          addFavorite(dog);
          setDisableSave(true)
    }
    const handleRemoveDog = () => {
      removeFavorite(dog.id);

    };

  return (
    <div>
      <h1>{match && "Your match is..."}</h1>
      <Link to={`/dog/${dog.id}`}>
        <h1>{dog.name}</h1>
        <img src={dog.img} alt={dog.name} />
      </Link>
      <div>{dog.breed}</div>
      <div>Age: {dog.age}</div>
      <div>Zip: {dog.zip_code}</div>
      {/* {!saved ? (
         
        <button onClick={handleSaveDog} disabled={disableSave || isFavorite}>
          Save
        </button>
      
      ) : (
        <button onClick={handleRemoveDog}>Remove</button>
      )} */}

      {!saved && !isFavorite ? (
        <button onClick={handleSaveDog} disabled={disableSave || isFavorite}>
          Save
        </button>
      ) : !saved && isFavorite ? (
        <p>heart</p>
      ) : (
        <button onClick={handleRemoveDog}>Remove</button>
      )}
    </div>
  );};

export default SingleDog;
