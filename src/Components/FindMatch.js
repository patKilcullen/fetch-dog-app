import React, {useContext, useState, useEffect} from "react";

import { FavoritesContext } from "../context/FavoritesContext";
import SingleDog from "./SingleDog";


const FindMatch = ({dogs}) => {

        const { getMatch, matches } = useContext(FavoritesContext);
        const [error, setError] = useState("")
const [loading, setLoading] = useState(false)
useEffect(()=>{
if(loading){
    console.log("WE BE LOADINGGGGGGg")
}
},[loading])


        const handleGetMatch = ()=>{
    setLoading(true);
try{
    let dogIds = dogs.map((dog)=> dog.id)


    
getMatch(dogIds);
}catch(errer){
setError(error)
}finally{
     setLoading(false);
        
}

        }

  return <div>
    {loading ?(
         <h1>loading....</h1>
     ) : null}
    <div>
    <button onClick={handleGetMatch}>{matches ? "Try another match" : "Get Match"}</button>

{matches ? <SingleDog dog={matches} match={true}/> : null}

<div>{error}</div>
</div>
  </div>;
};

export default FindMatch;
