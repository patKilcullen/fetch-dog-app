// import React, { useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// import { Route, Routes } from "react-router-dom";
// import AuthForm from "../features/auth/AuthForm";
// import Home from "../features/home/Home";


// import { me } from "./store";

// const AppRoutes = () => {
// //   const isLoggedIn = useSelector((state) => !!state.auth.me.id);

// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     dispatch(me());
// //   }, []);

//   return (
//     <div>
//       {/* LOGGED IN ROUTES */}
//       {isLoggedIn ? (
//         <Routes>
//           <Route path="/*" element={<Home />} />
//           {/* right not home is basically all games componenet, might want to mkae it home screen */}
//           <Route to="/home" element={<Home />} />
      
//         </Routes>
//       ) : (

//         <Routes>
//           <Route
//             path="/*"
//             element={<AuthForm name="login" displayName="Login" />}
//           />
       
//         </Routes>
//       )}
//     </div>
//   );
// };

// export default AppRoutes;


import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Components/login";
import Home from "../Components/Home";
import LoggedIn from "../Components/LoggedIn";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<LoggedIn />}>
        <Route path="/" element={<Home />} />

        
      </Route>
    </Routes>
  );
};

export default AppRoutes;