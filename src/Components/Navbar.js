import React, {useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
const { logout, user } = useContext(AuthContext);

  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    // dispatch(logout());
    // navigate('/login');
    logout()
  };

  return (
    <div>
      {/* <h1>{user?.name}'s Puppy Picker</h1> */}
      <h1>Puppy Picker</h1>
      <nav>
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">Home</Link>
          <button type="button" onClick={logoutAndRedirectHome}>
            Logout
          </button>
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
