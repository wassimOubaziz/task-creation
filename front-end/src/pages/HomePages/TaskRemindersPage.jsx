import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskRemindersPage = () => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDeadlineChange = (date) => {
    setDeadline(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && deadline) {
      // You can handle task reminder submission here (e.g., store it in a database)
      setShowSuccessAlert(true);
      setTitle("");
      setDeadline(null);
    }
  };

  return (
    <div style={{ margin: "50px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Task Reminders
      </h2>
      {showSuccessAlert && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            backgroundColor: "lightgreen",
            borderRadius: "4px",
          }}
        >
          Task reminder has been added successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Task Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            style={{ width: "100%", padding: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Task Deadline</label>
          <br />
          <DatePicker
            selected={deadline}
            onChange={handleDeadlineChange}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            style={{ width: "100%", padding: "5px" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Task Reminder
        </button>
      </form>
    </div>
  );
};

export default TaskRemindersPage;
