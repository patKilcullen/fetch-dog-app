import React, { useContext, useState, useEffect } from "react";

import { FavoritesContext } from "../context/FavoritesContext";
import SingleDog from "./SingleDog";

import { Typography, Button, Box } from "@mui/material";
const FindMatch = ({ dogs }) => {
  const { getMatch, matches } = useContext(FavoritesContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetMatch = () => {
    setLoading(true);
    try {
      let dogIds = dogs.map((dog) => dog.id);

      getMatch(dogIds);
    } catch (errer) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        pt: "20px",
        border: "2px solid white",
      }}
    >
      {loading ? <h1>loading....</h1> : null}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handleGetMatch}
          variant="contained"
          sx={{ color: "white", fontWeight: "bold", border: "2px solid white" }}
          color="secondary"
        >
          {matches ? "Try another match" : "Get Match"}
        </Button>

        {matches && <Typography>Your Match Is: </Typography>}
        {matches ? (
          <Box sx={{ minWidth: "400px" }}>
            <SingleDog dog={matches} match={true} />
          </Box>
        ) : null}

        <Box>{error}</Box>
      </Box>
    </Box>
  );
};

export default FindMatch;
