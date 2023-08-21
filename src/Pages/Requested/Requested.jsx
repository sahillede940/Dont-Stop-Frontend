import React, { useState, useEffect } from "react";
import axios from "axios";
import { SHOW_MY_REQ } from "../../Url";
import RequestCard from "./RequestCard";
import "./Requested.scss";

const Requested = () => {
  const [cps, setCps] = useState([]);
  const curUser = JSON.parse(localStorage.getItem("curUser"));
  // console.log(curUser._id);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${SHOW_MY_REQ + curUser._id}`)
        .then(function (res) {
          // console.log(res);
          setCps(res.data.UserSelectors);
          // console.log(cps);
        })
        .catch(function (err) {
          // console.log(err);
        });
    };

    fetchData();
  }, []);

  return (
    <div className="pc-container">
      <div className="MainDiv">
        <h1>Your Application Status</h1>
      </div>
      {cps?.map((item, i) => {
        return (
          <RequestCard
            key={i}
            name={item.competition.name}
            status={item.status}
          />
        );
      })}
    </div>
  );
};

export default Requested;

//   await axios
//     .get(
//       `https://webathon-backend.onrender.com/api/comp/showMyRequests/63cbbe447114b3f918c26a59`
//     )
//     .then(function (res) {
//       return res.json();
//       //   setCps(res.data.UserSelectors);
//       //   // console.log(res.data.UserSelectors);
//     })
//     .then((data) => {
//       setCps(data.UserSelectors);
//       // console.log(data.UserSelectors);
//     })
//     .catch(function (err) {
//       // console.log(err);
//     });
