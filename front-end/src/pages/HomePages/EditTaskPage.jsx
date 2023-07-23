import React, { useState, useEffect } from "react";
import ax from "../../axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditTaskPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [status, setStatus] = useState("todo"); // Default value set to "todo"
  const [cookies] = useCookies(["token"]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await ax.get(`/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        const task = response.data.task;
        setTitle(task.title);
        setDescription(task.description);
        setDeadline(new Date(task.deadLine));
        setStatus(task.status); // Update the status field
      } catch (error) {
        console.log("Error fetching task:", error);
      }
    }
    fetchTask();
  }, [id, cookies.token]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDeadlineChange = (date) => {
    setDeadline(date);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(status);
    try {
      await ax.put(
        `/tasks/${id}`,
        {
          title,
          description,
          deadLine: deadline.toISOString(),
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      navigate("/home/task-management");
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Task Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleTitleChange}
            required
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
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Task Deadline</label>
          <br />
          <DatePicker
            selected={deadline}
            onChange={handleDeadlineChange}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Task Status</label>
          <select
            className="form-control"
            value={status}
            onChange={handleStatusChange}
            required
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Save Task
        </button>
        <Link to="/home/task-management" className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default EditTaskPage;
