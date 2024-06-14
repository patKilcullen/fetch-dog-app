import React from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";


// SEACH DOGS by breed and age
const Search = ({
  selectedBreeds,
  handleRemoveBreed,
  handleAddBreed,
  breedList,
  ageMin,
  setAgeMin,
  ageMax,
  setAgeMax,
  setFrom,
  fetchResults,
}) => {

  // SUBMIT SEARCH
  const handleSubmit = (e) => {
    e.preventDefault();
    // reset pagination
    setFrom(0);
    fetchResults();
  };

  return (
    <Box sx={{ width: "40vw" }}>
      <form onSubmit={handleSubmit}>
        <h1>Search Dogs: </h1>
        <Box>
          {/* ALL SELECTED BREEDS */}
          <Typography variant="h6">Selected Breeds:</Typography>
          {selectedBreeds.map((breed) => (
            <Chip
              color="secondary"
              key={breed}
              label={breed}
              sx={{
                color: "white",
                fontWeight: "bold",
                border: "2px solid white",
              }}
              onDelete={() => handleRemoveBreed(breed)}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl
            sx={{
              m: 1,
              width: 300,
              display: "flex",
              alignItems: "center",
            }}
          >

            {/* BREED DROPDOWN MENU */}
            <label >Breeds:</label>
            <Select
              value={selectedBreeds}
              onChange={handleAddBreed}
              sx={{
                backgroundColor: "white",
                width: { xs: "200px", sm: "100%" },
              }}
            >
              {breedList.map((breed) => (
                <MenuItem key={breed} value={breed}>
                  {breed}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <label>Min Age:</label>
          <input
            type="number"
            value={ageMin}
            onChange={(e) => setAgeMin(e.target.value)}
          />
        </Box>
        <Box>
          <label>Max Age:</label>
          <input
            type="number"
            value={ageMax}
            onChange={(e) => setAgeMax(e.target.value)}
          />
        </Box>
      </form>
    </Box>
  );
};

export default Search;
