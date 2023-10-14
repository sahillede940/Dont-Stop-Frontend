import React, { useEffect, useState } from "react";
import ContestCard from "../../Components/ContestCard/ContestCard";
import axiosInstance from "../../axiosInstance";
import { ALL_COMPS } from "../../Url";
import { useSelector } from "react-redux";
import Spinner from "../../Components/Spinner/Spinner";

const Home = () => {
  const [cps, setCps] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const curUser = useSelector((state) => state.auth).user;

  const fetchData = async (link) => {
    setLoading(true);
    await axiosInstance
      .get(link)
      .then(function (res) {
        setCps(res.data.results);
        setNext(res.data.next);
        setPrev(res.data.previous);
        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData(ALL_COMPS);
  }, [curUser]);

  return (
    <div>
      <div
        className="pc-container"
        style={{ margin: "1rem auto", padding: "10px 1rem", display: "flex" }}
      >
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <span className="btn_reload" onClick={() => fetchData(ALL_COMPS)}>
          Reload
        </span>
      </div>
      {loading ? (
        <div
        style={{ margin: "1rem auto", width: "100%",padding: "10px 1rem", display: "flex" }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          {!cps.length && <h1>No Contest has been posted</h1>}
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
          {(next || prev) && (
            <div
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
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
