import React, {useContext} from "react";

import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

import SearchDogs from "./SearchDogs";
const Home = () => {
const navigate = useNavigate()


const handleGetBreeds = ()=>{

     navigate('/breeds')
}
    
     const { logout, user } = useContext(AuthContext);
  return (
    <div>
      {/* <div>hello {user.name}</div> */}

{/* <h1>Welcome</h1> */}
{/* <button onClick={handleGetBreeds}>Get breeds</button> */}
<SearchDogs />
    </div>
  );

};

export default Home;
