import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "An " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          } else {
            M.toast({
              html: "Create post success.",
              classes: "#388e3c green darken-2",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
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
  const onSubmit = (e) => {
    e.preventDefault();
    postDetails();
  };
  return (
    <div className="container createPost ">
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 card">
          <h1 className="text-center mt-4">Create Post</h1>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="title"
                className="form-control"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <input
                type="body"
                className="form-control"
                placeholder="Enter body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="file">Upload Image</label>
              <input
                type="file"
                className="form-control-file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="row justify-content-center">
              <button type="submit" className="btn btn-primary mt-2 mb-4">
                Submit Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
