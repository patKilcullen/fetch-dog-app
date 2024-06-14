import React, { useContext } from "react";

import { FavoritesContext } from "../context/FavoritesContext";

import SingleDog from "./SingleDog";
import FindMatch from "./FindMatch";

import { Typography, Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const Favorites = () => {
  const theme = useTheme();
  const { favorites } = useContext(FavoritesContext);
  return (
    <Box
      sx={{
        overflow: "scroll",
        pt: "120px",
        height: "100vh",
        backgroundColor: theme.background.default,
      }}
    >
      <Typography variant="h6">Favorite Dogs</Typography>
      <FindMatch dogs={favorites} />
      <Grid container spacing={2}>
        {favorites.map((dog) => (
          <Grid item xs={12} sm={6} md={4} key={dog.id}>
            <SingleDog dog={dog} saved={true} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Favorites;
