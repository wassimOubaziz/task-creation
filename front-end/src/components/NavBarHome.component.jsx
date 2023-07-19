import React from "react";
import { Link } from "react-router-dom";
import taskLogo from "../pages/IndexPages/images/task.png";
import logoutImage from "../pages/HomePages/images/logout.png";
import profileIcon from "../pages/HomePages/images/profile.png";
import ax from "../axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function NavBarHome() {
  const [cookies, __setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const logout = () => {
    ax.get("/signout", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((res) => {
        console.log(res);
        removeCookie("token", { path: "/" }, { maxAge: 0 });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/home" className="navbar-brand">
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
            <li
              className="nav-item"
              style={{ cursor: "pointer" }}
              onClick={logout}
            >
              <div className="nav-link">
                <img
                  src={logoutImage}
                  alt="About"
                  width="24"
                  height="24"
                  className="icon mr-1"
                />
                Log Out
              </div>
            </li>
            <li className="nav-item">
              <Link to="/home/profile" className="nav-link">
                <img
                  src={profileIcon}
                  alt="Log In"
                  width="24"
                  height="24"
                  className="icon mr-1"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
