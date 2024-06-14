import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axiosConfig";

import SingleDog from "./SingleDog";

import LocationSearch from "./LocationSearch";

import DogList from "./DogList";

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

import { useTheme } from "@mui/material/styles";


// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };


const SearchDogs = () => {
     const theme = useTheme();
  const [breedList, setBreedList] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [size, setSize] = useState(25);
  const [from, setFrom] = useState(0);

   const [ageMin, setAgeMin] = useState("");
   const [ageMax, setAgeMax] = useState("");

     const [sort, setSort] = useState("breed:asc");



     const [locations, setLocations] = useState([]);

       const handleLocationSearch = (locations) => {
        
          setLocations(locations);
       };



  useEffect(() => {
    fetchBreeds();
    fetchResults();
  }, [selectedBreeds, from, sort,ageMax,ageMin, locations]);
  

  const fetchBreeds = async () => {
    try {
      const response = await axiosInstance.get("/dogs/breeds");
      setBreedList(response.data);
    } catch (error) {
      console.log("Failed to fetch breeds");
      setError(error)
    }
  };

  const fetchResults = async () => {
    setLoading(true);
    setError(null);

    const params = {
      breeds: selectedBreeds,
      size,
      from,
      zipCodes: locations,
      ageMin,
      ageMax,
      sort
    };

    try {
      const response = await axiosInstance.get("/dogs/search", { params });
      const { resultIds, total } = response.data;

      const dogResponse = await axiosInstance.post("/dogs", resultIds);
      setResults(dogResponse.data);
      setTotal(total);
    } catch (error) {
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (from + size < total) {
      setFrom(from + size);
    }
  };

  const handlePrevPage = () => {
    if (from > 0) {
      setFrom(from - size);
    }
  };


     const handleAddBreed = (event) => {
       if (selectedBreeds.length < 1) {
         setSelectedBreeds([event.target.value]);
       }

       if (
         !selectedBreeds.some((state) => state === event.target.value) &&
         event.target.value
       ) {
         setSelectedBreeds([...selectedBreeds, event.target.value]);
       }
     };



  const handleRemoveBreed = (breedToRemove) => {
  
    setSelectedBreeds(
      selectedBreeds.filter((breed) => breed !== breedToRemove)
    );
  };


  


  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: theme.background.default,
        // backgroundColor: "green",
        pt: "100px",
        // padding: 2,
        minHeight: "100vh",
      }}
    >
      <h2>Search Dogs</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //   reset pagination
          setFrom(0);
          fetchResults();
        }}
      >
        <Box>
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
              onDelete={() => {
                handleRemoveBreed(breed);
              }}
            />
          ))}
        </Box>

        <Box>
          <FormControl sx={{ m: 1, width: 300 }}>
            <label>Breeds:</label>

            <Select
              //   multiple={true}
              value={selectedBreeds}
              onChange={handleAddBreed}
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

        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
      <LocationSearch search={handleLocationSearch} />

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <p>{error}</p>}
      <Typography>Pooch Results: </Typography>

      <DogList
        results={results}
        total={total}
        sort={sort}
        setSort={setSort}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        from={from}
        size={size}
      />
    </Box>
  );
};

export default SearchDogs;



