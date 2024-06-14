import React, {useContext, useState, useEffect} from "react";

import { FavoritesContext } from "../context/FavoritesContext";
import SingleDog from "./SingleDog";


import {
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Chip,
  OutlinedInput,
} from "@mui/material";
const FindMatch = ({dogs}) => {

        const { getMatch, matches } = useContext(FavoritesContext);
        const [error, setError] = useState("")
const [loading, setLoading] = useState(false)
useEffect(()=>{
if(loading){
    console.log("WE BE LOADINGGGGGGg")
}
},[loading])


        const handleGetMatch = ()=>{
            debugger
    setLoading(true);
try{
    let dogIds = dogs.map((dog)=> dog.id)


    
getMatch(dogIds);
}catch(errer){
setError(error)
}finally{
     setLoading(false);
        
}

        }

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        pt: "100px",
      }}
    >
      {loading ? <h1>loading....</h1> : null}
      <Box>
        <Button
          onClick={handleGetMatch}
          variant="contained"
          sx={{ color: "white", fontWeight: "bold", border: "2px solid white" }}
          color="secondary"
        >
          {matches ? "Try another match" : "Get Match"}
        </Button>

        {matches && <Typography>Your Match Is: </Typography>}
        {matches ? <SingleDog dog={matches} match={true} /> : null}

        <Box>{error}</Box>
      </Box>
    </Box>
  );
};

export default FindMatch;
