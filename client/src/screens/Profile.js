import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

const Profile = () => {
  const [mypics, setMypics] = useState([]);
  const { state } = useContext(UserContext);
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

  return (
    <div className="container profile">
      <div className="row row-profile">
        <div className="col-sm-4 text-center">
          <img
            alt=""
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVN43RJJHZ49kk1BSFU5mbXpjXhSdPfwC6ETV9LNz81S7XgxQp&usqp=CAU"
          />
        </div>
        <div className="col-sm-8">
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
