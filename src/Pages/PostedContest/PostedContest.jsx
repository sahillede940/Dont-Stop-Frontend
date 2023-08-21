import React, { useState, useEffect } from "react";
import ContestCard from "../../Components/ContestCard/ContestCard";
import { MY_COMPS, POST_COMP } from "../../Url";
import axios from "axios";

import "./PostedContest.scss";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
const PostedContest = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");

  const [cps, setCps] = useState([]);
  const navigate = useNavigate();
  const curUser = JSON.parse(localStorage.getItem("curUser"));
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${MY_COMPS + curUser._id}`)
        .then(function (res) {
          setCps(res.data.Competitions);
          // console.log(res.data.Competitions);
        })
        .catch(function (err) {
          // console.log(err);
        });
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    let error = false;
    if (!name) {
      error = true;
      toast.error("Name can not be empty");
    }
    if (!description) {
      error = true;
      toast.error("Description can not be empty");
    }
    if (!teamMembers) {
      error = true;
      toast.error("Specify team size");
    }
    if (!location) {
      error = true;
      toast.error("Location can not be empty");
    }
    if (!deadline) {
      error = true;
      toast.error("Please specify deadline");
    }

    if (!error) {
      axios
        .post(POST_COMP, {
          name: name,
          teamSize: teamMembers,
          location: location,
          description: description,
          creator: curUser._id,
          deadline: deadline,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Competition Posted");
            window.location.reload();
          } else {
            toast.error("Some internal error occured");
          }
        })
        .catch((er) => {
          toast.error("Some internal error occured");
        });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="pc-container">
        <h2>Post competition</h2>
        <div>
          <p>Name of Contest</p>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Contest Name"
          />
        </div>
        <div>
          <p>Description</p>
          <textarea
            rows={10}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Contest Description"
          />
        </div>
        <div>
          <p>Team Members</p>
          <input
            className="pc-input"
            onChange={(e) => {
              setTeamMembers(e.target.value);
            }}
            type="number"
            placeholder="5"
          />
        </div>
        <div>
          <p>Location</p>
          <input
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            placeholder="IIT Kharagpur..."
          />
        </div>
        <div>
          <p>Deadline</p>
          <input
            onChange={(e) => {
              setDeadline(e.target.value);
            }}
            type="date"
          />
        </div>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <button className="Button apply" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>

      {cps?.map((cp) => {
        return <ContestCard key={cp._id} {...cp} del="true" />;
      })}
    </div>
  );
};

export default PostedContest;
