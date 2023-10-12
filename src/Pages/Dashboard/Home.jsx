import React, { useEffect, useState } from "react";
import ContestCard from "../../Components/ContestCard/ContestCard";
import axiosInstance from "../../axiosInstance";
import { ALL_COMPS } from "../../Url";

const Home = () => {
  const [cps, setCps] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [query, setQuery] = useState("");
  const curUser = JSON.parse(localStorage.getItem("curUser"));

  const fetchData = async (link) => {
    await axiosInstance
      .get(link)
      .then(function (res) {
        setCps(res.data.results);
        setNext(res.data.next);
        setPrev(res.data.previous);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData(ALL_COMPS);
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
      {!cps.length &&
        <h1>
          No Competition has been posted Yet !!!!!
        </h1>
      }
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
          if (cp.creator != curUser.id) {
            return (
              <ContestCard key={cp.id} {...cp} apply="true" posted="true" />
            );
          }
        })}
      {(next || prev) && <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem auto",
          padding: "10px 1rem",
        }}
        className="pc-container"
      >
        {next && (
          <button
            className="Button apply"
            style={{
              alignItems: "end",
            }}
            onClick={() => fetchData(next)}
          >
            Next
          </button>
        )}
        {prev && (
          <button
            style={{
              alignItems: "start",
            }}
            className="Button apply"
            onClick={() => fetchData(prev)}
          >
            Prev
          </button>
        )}
      </div>}
    </div>
  );
};

export default Home;
