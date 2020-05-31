import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </BrowserRouter>
  );
}

export default App;
