import React, { useState, useEffect } from "react";
import "./Navbar.scss";

import { Link } from "react-router-dom";
const curUser = JSON.parse(localStorage.getItem("curUser"));

const NavOpts = [
  { id: 1, opt: "Home", href: "/dashboard" },
  { id: 2, opt: "My-Request", href: "/applied" },
  { id: 3, opt: "My-Competition", href: "/posted" },
  { id: 4, opt: "Profile", href: "/profile" },
];

const Navbar = ({ toggleTheme }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("curUser")) {
      setShow(true);
    }
  }, [show]);
  return (
    <nav className="nav">
      <div className="nav_container">
        <h3 className="nav_team">Dont Stop</h3>
        <label class="switch">
          <input type="checkbox" onClick={toggleTheme} />
          <span class="slider"></span>
        </label>
        <ul className="nav_links">
          {NavOpts.map((NavOpt) => {
            const { opt, href, id } = NavOpt;
            if (id === 4) {
              if (curUser) {
              }
            }
            if (show) {
              return (
                <li key={id} className="nav_links_li">
                  <Link to={href}>{opt}</Link>
                </li>
              );
            } else {
              if (NavOpt.id === 4) {
                return (
                  <li key={id} className="nav_links_li">
                    <Link to={href}>{opt}</Link>
                  </li>
                );
              }
            }
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
