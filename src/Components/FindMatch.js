import React, {useContext, useState, useEffect} from "react";

import { FavoritesContext } from "../context/FavoritesContext";



const FindMatch = ({dogs}) => {

        const { getMatches, matches } = useContext(FavoritesContext);
        const [error, setError] = useState("")


        

        const handleGetMatch = ()=>{

try{

    
getMatches();
}catch(errer){
setError(error)
}

        }

  return <div>
    <button onClick={handleGetMatch}>Get Match</button>

<div>{matches}</div>
<div>{error}</div>
  </div>;
};

export default FindMatch;
