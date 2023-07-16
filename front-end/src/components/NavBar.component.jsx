import React from "react";
import { Link } from "react-router-dom";
import taskLogo from "../pages/IndexPages/images/task.png";
import aboutIcon from "../pages/IndexPages/images/about.png";
import loginIcon from "../pages/IndexPages/images/enter.png";
import signupIcon from "../pages/IndexPages/images/singup.png";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src={taskLogo}
            alt="Task Manager"
            width="50"
            height="50"
            className="mr-2"
          />
          <span className="text-primary">Task Manager</span>
        </Link>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                <img
                  src={aboutIcon}
                  alt="About"
                  width="24"
                  height="24"
                  className="icon mr-1"
                />
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                <img
                  src={loginIcon}
                  alt="Log In"
                  width="24"
                  height="24"
                  className="icon mr-1"
                />
                Log In
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                <img
                  src={signupIcon}
                  alt="Sign Up"
                  width="24"
                  height="24"
                  className="icon mr-1"
                />
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
