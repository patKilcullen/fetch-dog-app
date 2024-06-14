import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import SingleDog from "./SingleDog";
import { Box, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";


// FULL PAGE SINGLE DOG
const SingleDogPage = () => {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  useEffect(() => {


    // GET DOG: by id in params
    const fetchDog = async () => {
      try {
        const response = await axiosInstance.post("/dogs", [id]);
        setDog(response.data[0]);
      } catch (error) {
        setError("Failed to fetch dog details");
      } finally {
        setLoading(false);
      }
    };

    fetchDog();
  }, [id]);

  if (loading) {
    return <CircularProgress color="secondary" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box
      sx={{
    
        backgroundColor: theme.background.default,
      }}>
      {dog && (
        // return SingleDogItem with fullpage set to true
      <SingleDog dog={dog} fullPage={true}/>
      )}
    </Box>
  );
};

export default SingleDogPage;
