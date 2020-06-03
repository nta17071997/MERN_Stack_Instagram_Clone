import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

const Profile = () => {
  const [mypics, setMypics] = useState([]);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const { state, dispatch } = useContext(UserContext);
  //console.log(state)
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "An " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result)
        setMypics(result.myPost);
      });
  }, []);

  useEffect(() => {
    if (image) {
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

          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "An " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
              window.location.reload()
            });
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <div className="container profile">
      <div className="row row-profile">
        <div className="col-sm-4 text-center pr-0">
          <div>
            <img
              alt=""
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={state ? state.pic : "Loading ..."}
            />
          </div>
          <div className="form-group">
            <label htmlFor="file" className="mb-0 mt-2">
              Update pic
            </label>
            <input
              type="file"
              className="form-control-file"
              onChange={(e) => updatePhoto(e.target.files[0])}
            />
          </div>
        </div>
        <div
          className="col-sm-8 pl-0"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <h4>{state ? state.name : "loading"}</h4>
          <h4>{state ? state.email : "loading"}</h4>
          <div className="infoFollow">
            <h5>{mypics.length} posts</h5>
            <h5>{state ? state.followers.length : "0"} followers</h5>
            <h5>{state ? state.following.length : "0"} following</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="gallery col-md-12">
          {mypics.map((item) => {
            return (
              <img
                alt={item.title}
                className="item"
                key={item._id}
                src={item.photo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
