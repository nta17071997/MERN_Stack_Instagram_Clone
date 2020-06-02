import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { state } = useContext(UserContext);
  const { userid } = useParams();
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "An " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUserProfile(result);
      });
  }, []);
  return (
    <div>
      {userProfile ? (
        <div className="container profile">
          <div className="row row-profile">
            <div className="col-sm-4 text-center">
              <img
                alt=""
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVN43RJJHZ49kk1BSFU5mbXpjXhSdPfwC6ETV9LNz81S7XgxQp&usqp=CAU"
              />
            </div>
            <div className="col-sm-8">
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              <div className="infoFollow">
                <h5>{userProfile.posts.length} posts</h5>
                <h5>50 followers</h5>
                <h5>50 following</h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="gallery col-md-12">
              {userProfile.posts.map((item) => {
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
      ) : (
        <h2 className="text-center">Loading ... </h2>
      )}
    </div>
  );
};

export default UserProfile;
