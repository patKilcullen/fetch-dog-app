import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import SingleDog from "./SingleDog";

const SingleDogPage = () => {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const response = await axiosInstance.post("/dogs", [id]);
        setDog(response.data[0]);
      } catch (error) {
        setError("Failed to fetch dog details");
      } finally {
        setLoading(false);
      }
    };

    fetchDog();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* {dog && (
        <>
          <img src={dog.img} alt={dog.name} />
          <h1>{dog.name}</h1>
          <p>Breed: {dog.breed}</p>
          <p>Age: {dog.age}</p>
          <p>Zip Code: {dog.zip_code}</p>
        </>
      )} */}
      {dog && (
      <SingleDog dog={dog}/>
      )}
    </div>
  );
};

export default SingleDogPage;
