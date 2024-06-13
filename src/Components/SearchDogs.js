import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";

const SearchDogs = () => {
  const [breeds, setBreeds] = useState([]);
  
  const [results, setResults] = useState([]);



  const fetchResults = async () => {
 


    try {
      const response = await axiosInstance.get("/dogs/search", { breeds });
      debugger
      setResults(response.data.resultIds);
 
    } catch (error) {
 console.log("ERRROR: ", error)
    } 
  };

  return (
    <div>
      <h2>Search Dogs</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchResults();
        }}
      >
        <div>
          <label>Breeds:</label>
          <input
            type="text"
            value={breeds}
            onChange={(e) => setBreeds(e.target.value.split(","))}
          />
        </div>
     
        <button type="submit">Search</button>
      </form>
    
      <div>
        <h1>Results</h1>
    
        <ul>
          {results.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchDogs;
