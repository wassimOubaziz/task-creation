import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ax from "../../axios";
import { useNavigate } from "react-router-dom";
import backgroundImg from "./images/background-create-task.jpg";
import NavBarHome from "../../components/NavBarHome.component";
import { useCookies } from "react-cookie";

function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    // Set the default deadline one hour from the current time
    const oneHourFromNow = new Date();
    oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
    setDeadline(oneHourFromNow);
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDeadlineChange = (date) => {
    setDeadline(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle task submission here
    console.log("Task Submitted:", { title, description, deadline });
    ax.post(
      "/tasks",
      {
        title,
        description,
        deadLine: deadline,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        navigate("/home/task-management");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        position: "relative",
        zIndex: 0,
      }}
    >
      <div className="container">
        <NavBarHome />
      </div>
      {/* Background image container with blur filter */}
      <div
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(5px)", // Apply the blur filter to the background image
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "calc(100vh - 76px)",
        }}
      >
        <div
          style={{
            width: "80%",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              minWidth: "300px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2 className="mb-4">Create New Task</h2>
            <div className="mb-3">
              <label className="form-label">Task Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={handleTitleChange}
                required
                autoFocus
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  border: "1px solid #ced4da",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Task Description</label>
              <textarea
                className="form-control"
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  border: "1px solid #ced4da",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Task Deadline</label>
              <br />
              <DatePicker
                selected={deadline}
                onChange={handleDeadlineChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="dd/MM/yyyy HH:mm"
                className="form-control"
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  border: "1px solid #ced4da",
                  borderRadius: "8px",
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#007bff",
                borderColor: "#007bff",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "8px",
                cursor: "pointer",
                color: "#fff",
                transition: "background-color 0.3s ease",
              }}
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTaskPage;
