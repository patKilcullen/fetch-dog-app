// import React, { useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosConfig";

// const SearchDogs = () => {
//   const [breeds, setBreeds] = useState([]);

//   const [results, setResults] = useState([]);

//   const [total, setTotal] = useState(0);
//   const [size, setSize] = useState(10); // Results per page
//   const [from, setFrom] = useState(0); // Cursor for pagination

//    useEffect(() => {
//      fetchResults();
//    }, [breeds, from]);

//   const fetchResults = async () => {
//     try {
//     //   const response = await axiosInstance.get("/dogs/search", { breeds, size, from });
//     const response = await axiosInstance.get("/dogs");
//  console.log("RESPONSE: ", response)
//       setResults(response.data.resultIds);
//          setTotal(response.data.resultIds.length);
//     } catch (error) {
//       console.log("ERRROR: ", error);
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

//   return (
//     <div>
//       <h2>Search Dogs</h2>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           setFrom(0);
//           fetchResults();
//         }}
//       >
//         <div>
//           <label>Breeds:</label>
//           <input
//             type="text"
//             value={breeds}
//             onChange={(e) => setBreeds(e.target.value.split(","))}
//           />
//         </div>

//         <button type="submit">Search</button>
//       </form>

//       <div>
//         <h1>Results</h1>
//         <p>Total Results: {total}</p>
//         <ul>
//           {results.map((id) => (
//             <li key={id}>{id}</li>

//           ))}
//         </ul>
//       </div>

//       <div>
//         <button onClick={handlePrevPage} disabled={from === 0}>
//           Previous
//         </button>
//         <button onClick={handleNextPage} disabled={from + size >= total}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchDogs;

// import React, { useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosConfig";

// const SearchDogs = () => {

//       const [breedList, setBreedList] = useState([]);
//   const [breed, setBreed] = useState([]);

//   const [results, setResults] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [size, setSize] = useState(25); // Results per page
//   const [from, setFrom] = useState(0); // Cursor for pagination

//   useEffect(() => {
//     fetchResults();
//   }, [breed, from]);

// useEffect(() => {
//   const fetchBreeds = async () => {
//     try {
//       const response = await axiosInstance.get("/dogs/breeds");
//       setBreedList(response.data);
//     } catch (error) {
//    console.log("Failed to fetch breeds")
//     }
//   };

//   fetchBreeds();
// }, []);

//   const fetchResults = async () => {
//     setLoading(true);
//     setError(null);

//     const params = {
//       breed,
//       size,
//       from,
//     };

//     try {
//       const response = await axiosInstance.get("/dogs/search", { params });
//       const { resultIds, total } = response.data;

//       // Fetch full dog objects using the obtained IDs
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

//   return (
//     <div>
//       <h2>Search Dogs</h2>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           setFrom(0); // Reset pagination on new search
//           fetchResults();
//         }}
//       >
//         <div>
//           <label>Breeds:</label>
//           <input
//             type="text"
//             value={breed}
//             onChange={(e) => setBreed(e.target.value.split(","))}
//           />
//         </div>
//         <button type="submit">Search</button>
//       </form>

//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       <div>
//         <h1>Results</h1>
//         <p>Total {breed}s: {total}</p>
//         <ul>
//           {results.map((dog) => (
//             <li key={dog.id}>
//               <img src={dog.img} alt={dog.name} />
//               <div>{dog.name}</div>
//               <div>{dog.breed}</div>
//               <div>{dog.age}</div>
//               <div>{dog.zip_code}</div>
//             </li>
//           ))}
//         </ul>

//         <div>
//           <button onClick={handlePrevPage} disabled={from === 0}>
//             Previous
//           </button>
//           <button onClick={handleNextPage} disabled={from + size >= total}>
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchDogs;

import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axiosConfig";
import { Link } from "react-router-dom";

import { FavoritesContext } from "../context/FavoritesContext";

import SingleDog from "./SingleDog";

import LocationSearch from "./LocationSearch";

const SearchDogs = () => {
  const [breedList, setBreedList] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [size, setSize] = useState(25);
  const [from, setFrom] = useState(0);

   const [zipCodes, setZipCodes] = useState([]);
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
    setSelectedBreeds([...selectedBreeds, event.target.value]);
  };
  const handleRemoveBreed = (breedToRemove) => {
    setSelectedBreeds(
      selectedBreeds.filter((breed) => breed !== breedToRemove)
    );
  };


  


  return (
    <div>
      <h2>Search Dogs</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFrom(0); // Reset pagination on new search
          fetchResults();
        }}
      >
        <div>
          <label>Selected Breeds:</label>
          <ul>
            {selectedBreeds.map((breed) => (
              <li key={breed}>
                {breed}
                <button type="button" onClick={() => handleRemoveBreed(breed)}>
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label>Breeds:</label>
          <select
            multiple={true}
            value={selectedBreeds}
            onChange={handleAddBreed}
          >
            {breedList.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>

        {/* <div>
          <label>Zip Codes:</label>
          <input
            type="text"
            value={zipCodes}
            onChange={(e) => setZipCodes(e.target.value.split(","))}
          />
        </div> */}

        <div>
          <label>Min Age:</label>
          <input
            type="number"
            value={ageMin}
            onChange={(e) => setAgeMin(e.target.value)}
          />
        </div>
        <div>
          <label>Max Age:</label>
          <input
            type="number"
            value={ageMax}
            onChange={(e) => setAgeMax(e.target.value)}
          />
        </div>

        <button type="submit">Search</button>
      </form>
      <LocationSearch search={handleLocationSearch} />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        <h1>Pooch Results: </h1>
        <p>Total: {total}</p>

        <div>
          <label>Sort By:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="breed:asc">Breed (A - Z)</option>
            <option value="breed:desc">Breed (Z - A)</option>
            <option value="name:asc">Name (A - Z)</option>
            <option value="name:desc">Name (Z - Z)</option>
            <option value="age:asc">Age (youngest - oldest)</option>
            <option value="age:desc">Age (oldest - youngest)</option>
          </select>
        </div>

        {results.map((dog) => (
          //   <div key={dog.id}>
          <div key={dog}>
            <Link to={`/dog/${dog.id}`}>
              <SingleDog dog={dog} saved={false} />
            </Link>
          </div>
        ))}

        <div>
          <button onClick={handlePrevPage} disabled={from === 0}>
            Previous
          </button>
          <button onClick={handleNextPage} disabled={from + size >= total}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchDogs;
