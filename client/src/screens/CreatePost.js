import React from "react";

const CreatePost = () => {
  return (
    <div className="container createPost ">
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 card">
          <h1 className="text-center mt-4">Create Post</h1>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="title"
                className="form-control"
                placeholder="Enter title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <input
                type="body"
                className="form-control"
                placeholder="Enter body"
              />
            </div>
            <div className="form-group">
              <label htmlFor="file">Upload Image</label>
              <input
                type="file"
                className="form-control-file"
                placeholder="Enter file"
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
