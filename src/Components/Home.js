import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosConfig";

import LocationSearch from "./LocationSearch";
import DogList from "./DogList";
import Search from "./Search";
import { Typography, Box, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const size = 24;

const Home = () => {
  const theme = useTheme();
  const [breedList, setBreedList] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  }, []);

  // GET ALL BREEDS: to populate dropdown
  const fetchBreeds = async () => {
    try {
      const response = await axiosInstance.get("/dogs/breeds");
      setBreedList(response.data);
    } catch (error) {
      console.log("Failed to fetch breeds");
      setError(error);
    }
  };

  // SEARCH 
  const fetchResults = useCallback(async () => {
    setLoading(true);
    setError(null);

    const params = {
      breeds: selectedBreeds,
      size,
      from,
      zipCodes: locations,
      ageMin,
      ageMax,
      sort,
    };
    // SEARCH DOGS: if no locations/zipCodes selected to filter, search dogs/search API w/parama
    // to get IDs, then search /dogs API to get full dog object
    // IF locations length, do the same thing but in batches to acconut for large zipCode array that will throw error
    try {
      if (!locations.length) {
        const response = await axiosInstance.get("/dogs/search", { params });

        const { resultIds, total } = response.data;
        const dogResponse = await axiosInstance.post("/dogs", resultIds);
        setResults(dogResponse.data);
        setTotal(total);
      } else {
        const allResults = [];
        const batchSize = 100; // Adjust the batch size as needed

        for (let i = 0; i < locations.length; i += batchSize) {
          const batch = locations.slice(i, i + batchSize);
          const response = await axiosInstance.get("/dogs/search", {
            params: { ...params, zipCodes: batch },
          });
          const { resultIds } = response.data;
          const dogResponse = await axiosInstance.post("/dogs", resultIds);
          allResults.push(...dogResponse.data);
        }

        setResults(allResults);
        setTotal(allResults.length);
      }
    } catch (error) {
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  }, [selectedBreeds, from, locations, ageMin, ageMax, sort]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  // NEXT PAGE
  const handleNextPage = () => {
    if (from + size < total) {
      setFrom(from + size);
    }
  };

// PREVIOUS PAGE
  const handlePrevPage = () => {
    if (from > 0) {
      setFrom(from - size);
    }
  };

  // ADD BREED
  const handleAddBreed = (event) => {
    //  if no selectedBreed, add breed to array
    if (selectedBreeds.length < 1) {
      setSelectedBreeds([event.target.value]);
    }
    // don't add breed to array if it already exists in array or it no breed selected 
    // (second part prevents adding blank breed to lest on second click)
    if (
      !selectedBreeds.some((state) => state === event.target.value) &&
      event.target.value
    ) {
      setSelectedBreeds([...selectedBreeds, event.target.value]);
    }
  };

  // REMOVE BREED
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
        pt: "100px",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          gap: 2,
          p: 2,
        }}
      >
        {/* SEARCH COMPONENET */}
        <Search
          selectedBreeds={selectedBreeds}
          handleRemoveBreed={handleRemoveBreed}
          handleAddBreed={handleAddBreed}
          breedList={breedList}
          ageMin={ageMin}
          setAgeMin={setAgeMin}
          ageMax={ageMax}
          setAgeMax={setAgeMax}
          setFrom={setFrom}
          fetchResults={fetchResults}
        />
{/* LOACTION FILTER COMPONENT */}
        <LocationSearch search={handleLocationSearch} />
      </Box>
      <Typography variant="h2" sx={{ mt: 5 }}>
        Pooch Results:
      </Typography>
      {error && <p>{error}</p>}

      {/* LOADING */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            m: 2,
            height: "100vh",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
        {/* DOG LIST */}
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
        </>
      )}
    </Box>
  );
};

export default Home;
