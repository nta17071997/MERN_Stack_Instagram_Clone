import M from "materialize-css";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if(url){
      uploadFields()
    }
   
  }, [url])

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram-clone");
    data.append("cloud_name", "nguyenthanhan");

    fetch("https://api.cloudinary.com/v1_1/nguyenthanhan/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadFields = () => {
    //Check field email correct ?
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Invalid email!", classes: "#c62828 red darken-3" });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, //name: name
        password,
        email,
        pic: url
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
  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields()
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container signup">
      <div className="row justify-content-center">
        <div className="col-md-6 card">
          <h1 className="text-center">Instagram</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                className="form-control"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="file">Upload pic</label>
              <input
                type="file"
                className="form-control-file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="row justify-content-center">
              <button
                type="submit"
                onClick={() => PostData()}
                className="btn btn-primary"
              >
                Sign Up
              </button>
            </div>
            <h5 className="text-center">
              <Link to="/signin">Already have an account ?</Link>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
