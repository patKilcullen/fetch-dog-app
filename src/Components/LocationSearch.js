import React, { useState } from "react";

import axiosInstance from "../utils/axiosConfig";
import Map from "./Map";

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
  const [geoBoundingBox, setGeoBoundingBox] = useState(null);


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
        states,
        geoBoundingBox,
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

    

      const handleBoundingBoxChange = (boundingBox) => {
        setGeoBoundingBox(boundingBox);
      };


        const removeState = (stateToRemove) => {
          setStates(states.filter((state) => state !== stateToRemove));
        };

  return (
    <div>
      <h1>Filter by location: </h1>
      <form onSubmit={handleSearch}>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
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
            {states.map((state) => (
              <li key={state}>
                {state}
                <button type="button" onClick={() => removeState(state)}>
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Filter by Location</button>
      </form>
      {/* <Map onBoundingBoxChange={handleBoundingBoxChange} /> */}
      <p>{error}</p>
    </div>
  );
};

export default LocationSearch;
