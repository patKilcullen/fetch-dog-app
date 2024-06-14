import React from "react";
import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import SingleDog from "./SingleDog";

const DogList = ({
  results,
  total,
  sort,
  setSort,
  handlePrevPage,
  handleNextPage,
  from,
  size,
}) => {
  return (
    <Box sx={{ height: "80vh", overflow: "scroll" }}>
      {results.length > 0 ? (
        <Box>
          <Box>
            <Typography variant="body1">Total: {total}</Typography>
            <FormControl sx={{ m: 1, width: 300,  backgroundColor: "white" }}>
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

          <Grid container spacing={2}>
            {results.map((dog) => (
              <Grid item xs={12} sm={6} md={4} key={dog.id}>
                <SingleDog dog={dog} saved={false} />
              </Grid>
            ))}
          </Grid>

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

            sx={{
                width: "150px",
                color: "white",
                fontWeight: "bold",
                border: "2px solid white",
              }}
              color="secondary"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={from + size >= total}
              variant="contained"
              sx={{
                width: "150px",
                color: "white",
                fontWeight: "bold",
                border: "2px solid white",
              }}
              color="secondary"
            >
              Next
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography variant="h2" sx={{ color: "red" }}>
          No Results
        </Typography>
      )}
    </Box>
  );
};

export default DogList;
