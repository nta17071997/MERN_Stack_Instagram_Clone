import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

const Home = () => {
  const [data, setData] = useState([]);
  const { state } = useContext(UserContext);
  useEffect(() => {
    fetch("/allPost", {
      headers: {
        Authorization: "An " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);
  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "An " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "An " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container home">
      <div className="row justify-content-center">
        {data.map((item) => {
          return (
            <div className="col-md-9 card home-card" key={item._id}>
              <h5>{item.postedBy.name}</h5>
              <div className="card-image">
                <img alt="" className="" src={item.photo} />
              </div>
              <div className="card-content">
                <i class="material-icons mr-2" style={{ color: "red" }}>
                  favorite
                </i>
                {item.likes.includes(state._id) ? (
                  <i
                    class="material-icons mr-2"
                    style={{ color: "blue" }}
                    onClick={() => unlikePost(item._id)}
                  >
                    thumb_down
                  </i>
                ) : (
                  <i
                    class="material-icons mr-2"
                    style={{ color: "blue" }}
                    onClick={() => likePost(item._id)}
                  >
                    thumb_up
                  </i>
                )}

                <h6>{item.likes.length} likes</h6>
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
