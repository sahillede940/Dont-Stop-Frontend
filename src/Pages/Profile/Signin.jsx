import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { sign_in } from "../../Url";
import "./Profile.scss";
import { useNavigate } from "react-router";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("curUser")) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = () => {
    const id = toast.loading("Please wait...");
    axios
      .post(sign_in, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.success) {
          toast.dismiss(id);
          toast.success("Logged in");
          // console.log(res.data.user);
          localStorage.setItem("curUser", JSON.stringify(res.data.user));
          navigate("/");
          window.location.reload();
        } else {
          toast.dismiss(id);
          toast.error("Invalid Email or Wrong Password");
        }
      })
      .catch((er) => {
        toast.dismiss(id);
        toast.error("Some internal error occured, contact admin");
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="login-box">
        <div className=" flex-r">
          <div className="flex-r login-wrapper">
            <div className="login-text">
              <div className="logo">
                <span></span>
              </div>
              <h1> Sign In</h1>
              <p className="welcome">
                Welcome back. Continue your success journey!{" "}
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
                        setEmail(e.target.value);
                      }}
                    ></input>
                    <i className="fas fa-at"></i>
                  </div>
                </div>
                <div className="input-box">
                  <span className="label">Password</span>
                  <div className=" flex-r input">
                    <input
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="********"
                    ></input>
                    <i className="fas fa-at"></i>
                  </div>
                </div>
                <div className="btn cursorError" onClick={handleSubmit}>
                  Login
                </div>
                <span className="extra-line">
                  <span>Not Registered? </span>
                  <a className="cursorError"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Sign Up
                  </a>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
