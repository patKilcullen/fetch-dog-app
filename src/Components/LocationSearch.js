import React, { useState } from "react";

import axiosInstance from "../utils/axiosConfig";


import {
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  Box,
  Chip,
} from "@mui/material";
const regions = [
  { name: "Alabama", abb: "AL" },
  { name: "Alaska", abb: "AK" },
  { name: "Arizona", abb: "AZ" },
  { name: "Arkansas", abb: "AR" },
  { name: "California", abb: "CA" },
  { name: "Colorado", abb: "CO" },
  { name: "Connecticut", abb: "CT" },
  { name: "Delaware", abb: "DE" },
  { name: "Florida", abb: "FL" },
  { name: "Georgia", abb: "GA" },
  { name: "Hawaii", abb: "HI" },
  { name: "Idaho", abb: "ID" },
  { name: "Illinois", abb: "IL" },
  { name: "Indiana", abb: "IN" },
  { name: "Iowa", abb: "IA" },
  { name: "Kansas", abb: "KS" },
  { name: "Kentucky", abb: "KY" },
  { name: "Louisiana", abb: "LA" },
  { name: "Maine", abb: "ME" },
  { name: "Maryland", abb: "MD" },
  { name: "Massachusetts", abb: "MA" },
  { name: "Michigan", abb: "MI" },
  { name: "Minnesota", abb: "MN" },
  { name: "Mississippi", abb: "MS" },
  { name: "Missouri", abb: "MO" },
  { name: "Montana", abb: "MT" },
  { name: "Nebraska", abb: "NE" },
  { name: "Nevada", abb: "NV" },
  { name: "New Hampshire", abb: "NH" },
  { name: "New Jersey", abb: "NJ" },
  { name: "New Mexico", abb: "NM" },
  { name: "New York", abb: "NY" },
  { name: "North Carolina", abb: "NC" },
  { name: "North Dakota", abb: "ND" },
  { name: "Ohio", abb: "OH" },
  { name: "Oklahoma", abb: "OK" },
  { name: "Oregon", abb: "OR" },
  { name: "Pennsylvania", abb: "PA" },
  { name: "Rhode Island", abb: "RI" },
  { name: "South Carolina", abb: "SC" },
  { name: "South Dakota", abb: "SD" },
  { name: "Tennessee", abb: "TN" },
  { name: "Texas", abb: "TX" },
  { name: "Utah", abb: "UT" },
  { name: "Vermont", abb: "VT" },
  { name: "Virginia", abb: "VA" },
  { name: "Washington", abb: "WA" },
  { name: "West Virginia", abb: "WV" },
  { name: "Wisconsin", abb: "WI" },
  { name: "Wyoming", abb: "WY" },
  { name: "Alberta", abb: "AB" },
  { name: "British Columbia", abb: "BC" },
  { name: "Manitoba", abb: "MB" },
  { name: "New Brunswick", abb: "NB" },
  { name: "Newfoundland and Labrador", abb: "NL" },
  { name: "Nova Scotia", abb: "NS" },
  { name: "Northwest Territories", abb: "NT" },
  { name: "Nunavut", abb: "NU" },
  { name: "Ontario", abb: "ON" },
  { name: "Prince Edward Island", abb: "PE" },
  { name: "Quebec", abb: "QC" },
  { name: "Saskatchewan", abb: "SK" },
  { name: "Yukon", abb: "YT" }
];


const LocationSearch = ({ search }) => {
  const [city, setCity] = useState("");
  const [states, setStates] = useState([]);
  const [error, setError] = useState("")


  const fetchLocationsBySearch = async (locationInfo) => {
    try {
      const response = await axiosInstance.post(
        "/locations/search",
        locationInfo
      );

      return response.data;
    } catch (error) {
      console.error("Failed to fetch locations by search:", error);
    }
  };

    const handleSearch = async (event) => {
    setError("");
      event.preventDefault();

      const searchParams = {
        city,
        states: states.map((state)=> state.abb),
      };

      const locations = await fetchLocationsBySearch(searchParams);
      if(locations.results.length < 1){
       setError("Location not found...")
      }
      const locationZips = locations.results.map((location) => location.zip_code);
  
      search(locationZips);
    };



     const handleAddState = (event) => {

        if(states.length < 1){
            setStates([event.target.value]);
        }
     
         if (!states.some((state) => state === event.target.value) && event.target.value) {
       
           setStates([...states, event.target.value]);
         }
          
     };


        const removeState = (stateToRemove) => {
          setStates(states.filter((state) => state !== stateToRemove));
        };

  return (
    <Box
      sx={{
        width: "40vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Filter by Location: </h1>
      <form onSubmit={handleSearch}>
        <FormControl
          sx={{  width: 300, display: "flex", alignItems: "center", gap: "5px" }}
        >
          <Box>
            <Typography variant="h6">Selected States:</Typography>

            {states.map((state) => (
              <Chip
                color="secondary"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "2px solid white",
                }}
                key={state.abb}
                label={state.name}
                onDelete={() => {
                  removeState(state);
                }}
              />
            ))}
          </Box>
          <Box>
            <label>State:</label>

            <Select
              value={states}
              onChange={handleAddState}
              sx={{ backgroundColor: "white", width: "100px" }}
            >
              {regions.map((state) => (
                <MenuItem key={state.abb} value={state}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </FormControl>
        <Box>
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ color: "white", fontWeight: "bold", border: "2px solid white", mt: 2 }}
          color="secondary"
        >
          Filter by Location
        </Button>
      </form>
      {/* <Map onBoundingBoxChange={handleBoundingBoxChange} /> */}
      <Typography sx={{ color: "red" }}>{error}</Typography>
    </Box>
  );
};

export default LocationSearch;
