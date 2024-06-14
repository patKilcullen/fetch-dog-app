import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";

const Breeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axiosInstance.get("/dogs/breeds");
        setBreeds(response.data);
      } catch (error) {
        setError("Failed to fetch breeds");
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
   setError(error)
  }

  return (
    <div>
      <h2>Breeds</h2>
      <h2>{error}</h2>
      <ul>
        {breeds.map((breed, index) => (
          <li key={index}>{breed}</li>
        ))}
      </ul>
    </div>
  );
};

export default Breeds;
