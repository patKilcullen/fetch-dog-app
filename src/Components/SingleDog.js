// import React, {useContext, useState, useEffect} from "react";

// import { Link } from "react-router-dom";
// import { FavoritesContext } from "../context/FavoritesContext";


// const SingleDog = ({dog, saved, match}) => {
//    const { addFavorite, removeFavorite, favorites } = useContext(FavoritesContext);
//    const [disableSave, setDisableSave] = useState(false)
//    const [isFavorite, setIsFavorite] = useState(false)
 


//    useEffect(()=>{
//     if(favorites.some((favorite) => favorite.id === dog.id)){

//         setIsFavorite(true)
//     }

//    },[favorites])

//     const handleSaveDog = () =>{
//           addFavorite(dog);
//           setDisableSave(true)
//     }
//     const handleRemoveDog = () => {
//       removeFavorite(dog.id);

//     };

//   return (
//     <div>
//       <h1>{match && "Your match is..."}</h1>
//       <Link to={`/dog/${dog.id}`}>
//         <h1>{dog.name}</h1>
//         <img src={dog.img} alt={dog.name} />
//       </Link>
//       <div>{dog.breed}</div>
//       <div>Age: {dog.age}</div>
//       <div>Zip: {dog.zip_code}</div>
    

//       {!saved && !isFavorite ? (
//         <button onClick={handleSaveDog} disabled={disableSave || isFavorite}>
//           Save
//         </button>
//       ) : !saved && isFavorite ? (
//         <p>heart</p>
//       ) : (
//         <button onClick={handleRemoveDog}>Remove</button>
//       )}
//     </div>
//   );};

// export default SingleDog;
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const SingleDog = ({ dog, saved, match }) => {
  const { addFavorite, removeFavorite, favorites } =
    useContext(FavoritesContext);
  const [disableSave, setDisableSave] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorites.some((favorite) => favorite.id === dog.id)) {
      setIsFavorite(true);
    }
  }, [favorites, dog.id]);

  const handleSaveDog = () => {
    addFavorite(dog);
    setDisableSave(true);
  };

  const handleRemoveDog = () => {
    removeFavorite(dog.id);
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <Link
        to={`/dog/${dog.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          height="250"
          image={dog.img}
          alt={dog.name}
          sx={{ objectFit: "contain", mt: 1 }}
        />
      </Link>
      <CardContent>
        <Link
          to={`/dog/${dog.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {dog.name}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          {dog.breed}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {dog.age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Zip: {dog.zip_code}
        </Typography>
      </CardContent>
      <CardActions>
        {!saved && !isFavorite ? (
          <Button
            size="small"
            onClick={handleSaveDog}
            disabled={disableSave || isFavorite}
            sx={{
              fontWeight: "bold",
            }}
            color="secondary"
          >
            Add to Favorites
          </Button>
        ) : !saved && isFavorite ? (
          <IconButton disabled>
            <FavoriteIcon color="error" />
          </IconButton>
        ) : (
          <Button
            size="small"
            onClick={handleRemoveDog}
            sx={{
              fontWeight: "bold",
            }}
            color="secondary"
          >
            Remove
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default SingleDog;
