import React, { useState } from "react";

import axiosInstance from "../utils/axiosConfig";


const stateAbbreviations = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
  "AB",
  "BC",
  "MB",
  "NB",
  "NL",
  "NS",
  "NT",
  "NU",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
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
        // states: state ? [state] : [],
        states
      };

      const locations = await fetchLocationsBySearch(searchParams);
      if(locations.results.length < 1){
       setError("Location not found...")
      }
      const locationZips = locations.results.map((location) => location.zip_code);
  
      search(locationZips);
    };



     const handleAddState = (event) => {
       setStates([...states, event.target.value]);
     };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        {/* <div>
          <label>State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div> */}
        <div>
          <label>State:</label>
          <select multiple={true} value={states} onChange={handleAddState}>
            {stateAbbreviations.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Selected States:</label>
          <ul>
            {states.map((breed) => (
              <li key={breed}>
                {breed}
                {/* <button type="button" onClick={() => handleRemoveBreed(breed)}>
                  x
                </button> */}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Filter by Location</button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default LocationSearch;
