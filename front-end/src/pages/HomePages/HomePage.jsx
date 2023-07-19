import React from "react";
import { Link } from "react-router-dom";
import taskCreationImage from "./images/task-creation.jpg";
import taskManagementImage from "./images/task-management.png";
import taskRemindersImage from "./images/task-reminders.png";
import NavBarHome from "../../components/NavBarHome.component";

function HomePage() {
  return (
    <div className="container">
      <NavBarHome />
      <h1 className="text-center mt-5">Welcome to Task Manager</h1>
      <p className="text-center">We offer the following services:</p>

      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow" style={{ marginBottom: "20px" }}>
            <img
              src={taskCreationImage}
              className="card-img-top"
              alt="Task Creation"
              style={{ height: "180px" }}
            />
            <div className="card-body">
              <h5 className="card-title">Task Creation</h5>
              <p className="card-text">
                Create new tasks with a title, description, and deadline.
              </p>
              <Link to="/create-task" className="btn btn-primary">
                Create Task
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow" style={{ marginBottom: "20px" }}>
            <img
              src={taskManagementImage}
              className="card-img-top"
              alt="Task Management"
              style={{ height: "180px" }}
            />
            <div className="card-body">
              <h5 className="card-title">Task Management</h5>
              <p className="card-text">
                Manage your tasks, update their status, and track progress.
              </p>
              <Link to="/task-management" className="btn btn-primary">
                Manage Tasks
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow" style={{ marginBottom: "20px" }}>
            <img
              src={taskRemindersImage}
              className="card-img-top"
              alt="Task Reminders"
              style={{ height: "180px" }}
            />
            <div className="card-body">
              <h5 className="card-title">Task Reminders</h5>
              <p className="card-text">
                Receive notifications and reminders for upcoming task deadlines.
              </p>
              <Link to="/task-reminders" className="btn btn-primary">
                Set Reminders
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add additional service cards here */}
    </div>
  );
}

export default HomePage;
