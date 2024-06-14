import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axiosConfig";

import SingleDog from "./SingleDog";

import LocationSearch from "./LocationSearch";

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
              key={breed}
              label={breed}
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

      <Box>
        <h1>Pooch Results: </h1>
        <p>Total: {total}</p>

        <Box>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <MenuItem value="breed:asc">Breed (A - Z)</MenuItem>
              <MenuItem value="breed:desc">Breed (Z - A)</MenuItem>
              <MenuItem value="name:asc">Name (A - Z)</MenuItem>
              <MenuItem value="name:desc">Name (Z - A)</MenuItem>
              <MenuItem value="age:asc">Age (youngest - oldest)</MenuItem>
              <MenuItem value="age:desc">Age (oldest - youngest)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {results.map((dog) => (
          <Box key={dog}>
            <SingleDog dog={dog} saved={false} />
          </Box>
        ))}

        
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          mt: 2,
        }}
      >
        <Button
          onClick={handlePrevPage}
          variant="contained"
          disabled={from === 0}
          sx={{ width: "150px" }}
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          variant="contained"
          disabled={from + size >= total}
          sx={{ width: "150px" }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default SearchDogs;



// import React, { useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosConfig";
// import SingleDog from "./SingleDog";
// import LocationSearch from "./LocationSearch";
// import {
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   TextField,
//   FormControl,
//   InputLabel,
//   Grid,
//   Box,
//   CircularProgress,
//   Alert,
// } from "@mui/material";

// const SearchDogs = () => {
//   const [breedList, setBreedList] = useState([]);
//   const [selectedBreeds, setSelectedBreeds] = useState([]);
//   const [results, setResults] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [size, setSize] = useState(25);
//   const [from, setFrom] = useState(0);
//   const [ageMin, setAgeMin] = useState("");
//   const [ageMax, setAgeMax] = useState("");
//   const [sort, setSort] = useState("breed:asc");
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     fetchBreeds();
//     fetchResults();
//   }, [selectedBreeds, from, sort, ageMax, ageMin, locations]);

//   const fetchBreeds = async () => {
//     try {
//       const response = await axiosInstance.get("/dogs/breeds");
//       setBreedList(response.data);
//     } catch (error) {
//       console.log("Failed to fetch breeds");
//       setError(error);
//     }
//   };

//   const fetchResults = async () => {
//     setLoading(true);
//     setError(null);

//     const params = {
//       breeds: selectedBreeds,
//       size,
//       from,
//       zipCodes: locations,
//       ageMin,
//       ageMax,
//       sort,
//     };

//     try {
//       const response = await axiosInstance.get("/dogs/search", { params });
//       const { resultIds, total } = response.data;
//       const dogResponse = await axiosInstance.post("/dogs", resultIds);
//       setResults(dogResponse.data);
//       setTotal(total);
//     } catch (error) {
//       setError("Failed to fetch results");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNextPage = () => {
//     if (from + size < total) {
//       setFrom(from + size);
//     }
//   };

//   const handlePrevPage = () => {
//     if (from > 0) {
//       setFrom(from - size);
//     }
//   };

//   const handleAddBreed = (event) => {
//     if (selectedBreeds.length < 1) {
//       setSelectedBreeds([event.target.value]);
//     }

//     if (
//       !selectedBreeds.some((state) => state === event.target.value) &&
//       event.target.value
//     ) {
//       setSelectedBreeds([...selectedBreeds, event.target.value]);
//     }
//   };

//   const handleRemoveBreed = (breedToRemove) => {
//     setSelectedBreeds(
//       selectedBreeds.filter((breed) => breed !== breedToRemove)
//     );
//   };

//   const handleLocationSearch = (locations) => {
//     setLocations(locations);
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Search Dogs
//       </Typography>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           setFrom(0); // Reset pagination on new search
//           fetchResults();
//         }}
//       >
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Typography variant="h6">Selected Breeds:</Typography>
//             <ul>
//               {selectedBreeds.map((breed) => (
//                 <li key={breed}>
//                   {breed}
//                   <Button
//                     b
//                     onClick={() => handleRemoveBreed(breed)}
//                   >
//                     x
//                   </Button>
//                 </li>
//               ))}
//             </ul>
//           </Grid>

//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Breeds</InputLabel>
//               <Select multiple value={selectedBreeds} onChange={handleAddBreed}>
//                 {breedList.map((breed) => (
//                   <MenuItem key={breed} value={breed}>
//                     {breed}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               label="Min Age"
//               type="number"
//               fullWidth
//               value={ageMin}
//               onChange={(e) => setAgeMin(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Max Age"
//               type="number"
//               fullWidth
//               value={ageMax}
//               onChange={(e) => setAgeMax(e.target.value)}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <LocationSearch search={handleLocationSearch} />
//           </Grid>

//           <Grid item xs={12}>
//             <Button variant="contained" type="submit" fullWidth>
//               Search
//             </Button>
//           </Grid>
//         </Grid>
//       </form>

//       {loading && (
//         <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
//           <CircularProgress />
//         </Box>
//       )}
//       {error && (
//         <Box sx={{ m: 2 }}>
//           <Alert severity="error">{error}</Alert>
//         </Box>
//       )}

//       <Box sx={{ mt: 2 }}>
//         <Typography variant="h5">Pooch Results:</Typography>
//         <Typography>Total: {total}</Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Sort By</InputLabel>
//               <Select value={sort} onChange={(e) => setSort(e.target.value)}>
//                 <MenuItem value="breed:asc">Breed (A - Z)</MenuItem>
//                 <MenuItem value="breed:desc">Breed (Z - A)</MenuItem>
//                 <MenuItem value="name:asc">Name (A - Z)</MenuItem>
//                 <MenuItem value="name:desc">Name (Z - A)</MenuItem>
//                 <MenuItem value="age:asc">Age (youngest - oldest)</MenuItem>
//                 <MenuItem value="age:desc">Age (oldest - youngest)</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>

//         <Grid container spacing={2} sx={{ mt: 2 }}>
//           {results.map((dog) => (
//             <Grid item xs={12} sm={6} md={4} key={dog.id}>
//               <SingleDog dog={dog} saved={false} />
//             </Grid>
//           ))}
//         </Grid>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//           <Button
//             variant="contained"
//             onClick={handlePrevPage}
//             disabled={from === 0}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleNextPage}
//             disabled={from + size >= total}
//           >
//             Next
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default SearchDogs;
