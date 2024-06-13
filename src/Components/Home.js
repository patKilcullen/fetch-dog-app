import React, {useContext} from "react";

import { AuthContext } from "../context/AuthContext";


const Home = () => {

    
     const { logout, user } = useContext(AuthContext);
  return (
    <div>
      <div> Puppy Picker</div>
      <div>hello {user.name}</div>
      <button onClick={logout}>Logout</button>
    </div>
  );

};

export default Home;
