import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import validator from "validator";
import { signup } from "../../Url";
import "./Profile.scss";
import { useNavigate } from "react-router";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [about, setAbout] = useState("");

  // col
  const [colemail, setColEmail] = useState(false);
  const [colpassword, setColPassword] = useState(false);
  const [colname, setColName] = useState(false);
  const [colcollege, setColCollege] = useState(false);
  const [colabout, setColAbout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("curUser")) {
      navigate("/profile");
    }
  }, []);

  const handleSubmit = async () => {
    const id = toast.loading("Please wait...");
    let error = false;
    if (!validator.isEmail(email)) {
      error = true;
      setColEmail(true);
    }
    if (!password || password.length < 6) {
      error = true;
      setColPassword(true);
    }
    if (!name) {
      error = true;
      setColName(true);
    }
    if (!college) {
      error = true;
      setColCollege(true);
    }
    if (!about) {
      error = true;
      setColAbout(true);
    }

    if (!error) {
      axios
        .post(signup, {
          email: email,
          password: password,
          about: about,
          college: college,
          fullName: name,
        })
        .then((res) => {
          if (res.data.success) {
            toast.dismiss(id);
            toast.success("Registration success");
          } else {
            toast.dismiss(id);
            toast.error(res.data.message);
          }
        })
        .catch((er) => {
          toast.dismiss(id);
          toast.error("Some internal error occured, contact admin");
        });
    } else {
      toast.dismiss(id);
      toast.error("Invalid Entries");
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="login-box">
        <div className=" flex-r">
          <div className="flex-r login-wrapper">
            <div className="login-text">
              <h1>Sign Up</h1>
              <p className="welcome">
                Hello, Create an account to use our portal!{" "}
              </p>

              <form className="flex-c">
                <div className="input-box">
                  <span className="label">E-mail</span>
                  <div className=" flex-r input">
                    <input
                      name="email"
                      type="text"
                      placeholder="name@abc.com"
                      value={email}
                      onChange={(e) => {
                        setColEmail(false);
                        setEmail(e.target.value);
                      }}
                    ></input>
                    <i className="fas fa-at"></i>
                  </div>
                  {colemail && (
                    <div className="red-para">Email is not valid</div>
                  )}
                </div>
                <div className="input-box">
                  <span className="label">Password</span>
                  <div className=" flex-r input">
                    <input
                      type="password"
                      onChange={(e) => {
                        setColPassword(false);
                        setPassword(e.target.value);
                      }}
                      placeholder="********"
                    ></input>
                    <i className="fas fa-at"></i>
                  </div>
                  {colpassword && (
                    <div className="red-para">
                      Password must be 6 characters long
                    </div>
                  )}
                </div>
                <div className="input-box">
                  <span className="label">Full Name</span>
                  <div className=" flex-r input">
                    <input
                      onChange={(e) => {
                        setColName(false);
                        setName(e.target.value);
                      }}
                      placeholder="Name"
                    ></input>
                    <i className="fas fa-at"></i>
                  </div>
                  {colname && (
                    <div className="red-para">Full name is required</div>
                  )}
                </div>
                <div className="input-box">
                  <span className="label">College</span>
                  <div className=" flex-r input">
                    <input
                      onChange={(e) => {
                        setColCollege(false);
                        setCollege(e.target.value);
                      }}
                      placeholder="IIT Kharagpur"
                    ></input>
                    <i className="fas fa-at"></i>
                  </div>
                  {colcollege && (
                    <div className="red-para">College is required</div>
                  )}
                </div>
                <div className="input-box">
                  <span className="label">About</span>
                  <div className=" flex-r input">
                    <input
                      onChange={(e) => {
                        setColAbout(false);
                        setAbout(e.target.value);
                      }}
                      placeholder="I am a coder and ....."
                    ></input>
                  </div>
                  {colabout && (
                    <div className="red-para">About can not be empty</div>
                  )}
                </div>
                <div className="btn cursorError" onClick={handleSubmit}>
                  Create Account
                </div>
                <br></br>
                <span className="extra-line">
                  <span>Already have an account?</span>
                  <a
                    className="cursorError"
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    &nbsp;Sign In
                  </a>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div style={{ alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              width: "80%",
              backgroundColor: "#E5E0FF",
              padding: "20px",
              margin: "50px auto",
              borderRadius: "10px",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <p>Email id</p>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={{
                  width: "50%",
                  borderStyle: "none",
                  height: "30px",
                  borderRadius: "10px",
                  margin: "5px auto",
                  padding: "10px",
                }}
                placeholder="abc@xyz.com"
              />
              {colemail && <div className="red-para">Email is not valid</div>}
            </div>
            <div style={{ display: "flex" }}>
              <p>Password</p>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                style={{
                  width: "50%",
                  borderStyle: "none",
                  height: "30px",
                  borderRadius: "10px",
                  margin: "5px auto",
                  padding: "10px",
                }}
                placeholder="********"
              />
              {colpassword && <div className="red-para">Password must be 6 characters long</div>}
            </div>
            <div style={{ display: "flex" }}>
              <p>Full Name</p>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                style={{
                  width: "50%",
                  borderStyle: "none",
                  height: "30px",
                  borderRadius: "10px",
                  margin: "5px auto",
                  padding: "10px",
                }}
                placeholder="Name"
              />
              {colname && <div className="red-para">Full name is required</div>}
            </div>
            <div style={{ display: "flex" }}>
              <p>College</p>
              <input
                onChange={(e) => {
                  setCollege(e.target.value);
                }}
                style={{
                  width: "50%",
                  borderStyle: "none",
                  height: "30px",
                  borderRadius: "10px",
                  margin: "5px auto",
                  padding: "10px",
                }}
                placeholder="IIT Kharagpur"
              />
              {colcollege && <div className="red-para">College is required</div>}
            </div>
            <div style={{ display: "flex" }}>
              <p>About</p>
              <input
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
                style={{
                  width: "50%",
                  borderStyle: "none",
                  height: "30px",
                  borderRadius: "10px",
                  margin: "5px auto",
                  padding: "10px",
                }}
                placeholder="I am a coder and ....."
              />
              {colabout && <div className="red-para">About can not be empty</div>}
            </div>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "green",
                  border: 0,
                  borderRadius: "5px",
                  padding: "10px 20px",
                  margin: "10px",
                  cursor: 'pointer'
                }}
                onClick={handleSubmit}
              >
                Signup
              </button>
            </div>
          </div>
        </div> */}
    </>
  );
};

export default Signup;
