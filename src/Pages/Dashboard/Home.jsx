import React, { useEffect, useState } from "react";
import ContestCard from "../../Components/ContestCard/ContestCard";
import axios from "axios";
import { ALL_COMPS } from "../../Url"

const Home = () => {
  const [cps, setCps] = useState([]);
  const [query, setQuery] = useState("");
  const curUser = JSON.parse(localStorage.getItem("curUser"));

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(ALL_COMPS)
        .then(function (res) {
          setCps(res.data.Competitions);
          console.log(res.data.Competitions);
        })
        .catch(function (err) {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      <div
        className="pc-container"
        style={{ margin: "1rem auto", padding: "10px 1rem" }}
      >
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
      </div>
      {cps
        .filter((cp) => {
          const { name } = cp;
          if (query == "") {
            return cp;
          } else if (name.toLowerCase().includes(query.toLowerCase())) {
            return cp;
          }
        })
        .map((cp) => {
          let already = false;
          for (const user of cp.applied_users) {
            // console.log(user, curUser._id)
            if (user.userApplied === curUser._id) {
              already = true;
            }
          }
          if (cp.creator?._id != curUser._id) {
            return (
              <ContestCard
                key={cp._id}
                {...cp}
                already={already}
                apply="true"
                posted="true"
              />
            );
          }
        })}
    </div>
  );
};

export default Home;