import M from "materialize-css";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const NewPassword = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const {token} = useParams()
  console.log(token)
  const PostData = () => {
   
    fetch("/new-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          
          M.toast({ html: data.message, classes: "#388e3c green darken-2" });
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    PostData();
  }
  return (
    <div className="container signin">
      <div className="row justify-content-center">
        <div className="col-md-6 card">
          <h1 className="text-center">Instagram</h1>
          <form onSubmit={onSubmit}>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter a new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="row justify-content-center">
              <button type="submit" className="btn btn-primary">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default NewPassword;
