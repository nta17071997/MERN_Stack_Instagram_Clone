import React from "react";

const Profile = () => {
  return (
    <div className="container profile">
      <div className="row row-profile">
        <div className="col-sm-4 text-center">
          <img alt="" 
            style={{width: "160px", height: "160px", borderRadius:"80px"}}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVN43RJJHZ49kk1BSFU5mbXpjXhSdPfwC6ETV9LNz81S7XgxQp&usqp=CAU"
          />
        </div>
        <div className="col-sm-8">
          <h4>An</h4>
          <div className="infoFollow">
            <h5>40 posts</h5>
            <h5>50 followers</h5>
            <h5>50 following</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="gallery col-md-12">
          <img alt="" className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVN43RJJHZ49kk1BSFU5mbXpjXhSdPfwC6ETV9LNz81S7XgxQp&usqp=CAU"/>
          <img alt="" className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVN43RJJHZ49kk1BSFU5mbXpjXhSdPfwC6ETV9LNz81S7XgxQp&usqp=CAU"/>
          <img alt="" className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVN43RJJHZ49kk1BSFU5mbXpjXhSdPfwC6ETV9LNz81S7XgxQp&usqp=CAU"/>
          <img alt="" className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVN43RJJHZ49kk1BSFU5mbXpjXhSdPfwC6ETV9LNz81S7XgxQp&usqp=CAU"/>
          <img alt="" className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVN43RJJHZ49kk1BSFU5mbXpjXhSdPfwC6ETV9LNz81S7XgxQp&usqp=CAU"/>
          <img alt="" className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVN43RJJHZ49kk1BSFU5mbXpjXhSdPfwC6ETV9LNz81S7XgxQp&usqp=CAU"/>
        </div>
      </div>
    </div>
  );
};

export default Profile;