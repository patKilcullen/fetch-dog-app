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

const SingleDog = ({ dog, saved, fullPage }) => {
  const { addFavorite, removeFavorite, favorites } =
    useContext(FavoritesContext);
  const [disableSave, setDisableSave] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);


  // IF FAVORITE, set isFavorite on mount
  useEffect(() => {
    if (favorites.some((favorite) => favorite.id === dog.id)) {
      setIsFavorite(true);
    }
  }, [favorites, dog.id]);


  // SAVE
  const handleSaveDog = () => {
    addFavorite(dog);
    setDisableSave(true);
  };

  // REMOVE
  const handleRemoveDog = () => {
    removeFavorite(dog.id);
  };

  // IF FULLPAGE, change styling
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: fullPage ? "80%" : 345,
          m: 2,

          minWidth: fullPage ? "80%" : "90%",
          mt: fullPage ? "200px" : null,
        }}
      >
        <Link
          to={`/dog/${dog.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardMedia
            component="img"
            height={fullPage ? "400" : "250"}
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

        {/* SAVE/REMOVE/HEART depending on favorite status and whether in search or favorites component */}
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
    </Box>
  );
};

export default SingleDog;
