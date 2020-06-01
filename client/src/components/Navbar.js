import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory()
  const renderList = () => {
    if (state) {
      return [
        <li className="nav-item">
          <Link to="/profile">Profile</Link>
        </li>,
        <li className="nav-item">
          <Link to="/createpost">CreatePost</Link>
        </li>,
        <li className="nav-item">
          <button 
            className="btn btn-danger"
            onClick={() => {
              localStorage.clear()
              dispatch({type: "CLEAR"})
              history.push('/signin')
            }}
          >Logout</button>
        </li>,
      ];
    } else {
      return [
        <li className="nav-item active">
          <Link to="/signin">SignIn</Link>
        </li>,
        <li className="nav-item">
          <Link to="/signup">SignUp</Link>
        </li>,
      ];
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <Link className="navbar-brand brand-logo left" to={state?"/":"/signin"}>
                Instagram
              </Link>
              <ul className="navbar-nav mt-2 mt-lg-0">{renderList()}</ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
