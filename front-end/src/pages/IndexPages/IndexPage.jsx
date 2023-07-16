import React from "react";
import { Link } from "react-router-dom";
import taskImage from "./images/1.jpg";
import NavBar from "../../components/NavBar.component";
import { useOutlet, Outlet } from "react-router-dom";

function IndexPage() {
  const outlet = useOutlet();
  return (
    <div className="container">
      {outlet ? (
        <Outlet />
      ) : (
        <>
          <NavBar />
          <div
            className="jumbotron"
            style={{
              height: `calc(100vh - 76px)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "-50px",
            }}
          >
            <div className="row">
              <div className="col-md-6">
                <h1 className="display-4">Welcome to Task Manager</h1>
                <p className="lead">
                  Stay organized and manage your tasks effectively.
                </p>
                <hr className="my-4" />
                <p>Create tasks, set deadlines, track progress, and more.</p>
                <Link to="/signup" className="btn btn-primary btn-lg">
                  Get Started
                </Link>
              </div>
              <div className="col-md-6">
                <img src={taskImage} alt="Task Manager" className="img-fluid" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default IndexPage;
