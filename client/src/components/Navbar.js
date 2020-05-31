import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <Link className="navbar-brand brand-logo left" to="/">
                Instagram
              </Link>
              <ul className="navbar-nav mt-2 mt-lg-0">
                <li className="nav-item active">
                  <Link to="/signin">SignIn</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup">SignUp</Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link to="/createpost">CreatePost</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
