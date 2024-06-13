import React, {useContext, useState, useEffect} from "react";

import { FavoritesContext } from "../context/FavoritesContext";
import SingleDog from "./SingleDog";


const FindMatch = ({dogs}) => {

        const { getMatch, matches } = useContext(FavoritesContext);
        const [error, setError] = useState("")




        const handleGetMatch = ()=>{

try{
    let dogIds = dogs.map((dog)=> dog.id)

    
getMatch(dogIds);
}catch(errer){
setError(error)
}

        }

  return <div>
    <button onClick={handleGetMatch}>Get Match</button>

{matches ? <SingleDog dog={matches} match={true}/> : null}
<div>{error}</div>
  </div>;
};

export default FindMatch;
