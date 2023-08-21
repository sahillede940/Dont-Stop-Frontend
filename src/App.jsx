import "./App.scss";
import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route, Router } from "react-router-dom";
import Home from "./Pages/Dashboard/Home";
import PostedContest from "./Pages/PostedContest/PostedContest";
import Profile from "./Pages/Profile/Profile";
import Error from "./Pages/Error/Error";
import Signin from "./Pages/Profile/Signin";
import Signup from "./Pages/Profile/Signup";
import Requested from "./Pages/Requested/Requested";
import MenuOverlay from "./Components/MenuOverlay/MenuOverlay";
import Decision from "./Components/Accept/Decline/Decision";
import ViewUser from "./Components/ViewUser/ViewUser";

function App() {
 
  return (
    <div className="App">
      <Navbar />
      <MenuOverlay />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/posted" element={<PostedContest />} />
          <Route path="/applied" element={<Requested />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/view-application" element={<Decision />} />
          <Route path="/view-user" element={<ViewUser />} />

          <Route path="/view-profile/:id" element={<ViewUser />} />
        </>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
