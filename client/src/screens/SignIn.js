import React from "react";
import {Link} from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="container signin">
      <div className="row justify-content-center">
        <div className="col-md-6 card">
          <h1 className="text-center">Instagram</h1>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder='Enter email'
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder='Enter password'
              />
            </div>
            <div className='row justify-content-center'>
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
            <h5 className='text-center'>
                <Link to="/signup">
                    Don't have an account ?
                </Link>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
