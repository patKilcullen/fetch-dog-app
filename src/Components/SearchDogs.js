import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";

import LocationSearch from "./LocationSearch";

import DogList from "./DogList";
import Search from "./Search";
import { Typography, Box, CircularProgress } from "@mui/material";

import { useTheme } from "@mui/material/styles";

const SearchDogs = () => {
  const theme = useTheme();
  const [breedList, setBreedList] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [size, setSize] = useState(24); //set to 24 to fit grid evenly
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
  }, [selectedBreeds, from, sort, ageMax, ageMin, locations]);

  const fetchBreeds = async () => {
    try {
      const response = await axiosInstance.get("/dogs/breeds");
      setBreedList(response.data);
    } catch (error) {
      console.log("Failed to fetch breeds");
      setError(error);
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
      sort,
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
        pt: "100px",
        minHeight: "100vh",
      }}
    >
      {/* <Box sx={{ display: "flex", justifyContent: "space-around" }}> */}
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

        <LocationSearch search={handleLocationSearch} />
      </Box>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <p>{error}</p>}
      <Typography variant="h2" sx={{ mt: 5 }}>
        Pooch Results:{" "}
      </Typography>

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
