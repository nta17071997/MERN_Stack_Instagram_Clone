import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/allPost", {
      headers: {
        Authorization: "An " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.posts);
        setData(result.posts);
      });
  }, []);
  return (
    <div className="container home">
      <div className="row">
        {data.map((item) => {
          return (
            <div className="col-md-9 card home-card" key={item._id}>
              <h5>{item.postedBy.name}</h5>
              <div className="card-image">
                <img alt="" className="" src={item.photo} />
              </div>
              <div className="card-content">
                <i className="fas fa-heart" style={{ color: "red" }}></i>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                <input type="text" placeholder="add comment" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
