import React, { useState, useEffect } from "react";
import ax from "../../axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd"; // Import useDrag and useDrop
import Modal from "react-modal";

const ItemTypes = {
  TASK: "task",
};

function Task({ task, index, moveTask, handleDelete, handleTaskClick }) {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoveredRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;
      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }
      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task._id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <tr ref={ref} style={{ opacity }}>
      <td>{task.title}</td>
      <td>
        {task?.description?.length < 15
          ? task?.description
          : task?.description?.substring(0, 15) + "..."}
      </td>
      <td>
        {
          //give me the date without seconds
          new Date(task.deadLine).toLocaleString("en-US", {
            hour12: true,
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
        }
      </td>
      <td>{task.status}</td>
      <td>
        <Link
          to={`/home/edit-task/${task._id}`}
          className="btn btn-primary me-2"
        >
          Edit
        </Link>
        <button
          onClick={() => handleDelete(task._id)}
          className="btn btn-danger"
          style={{ marginRight: "8px" }}
        >
          Delete
        </button>
        <button onClick={() => handleTaskClick(task)} className="btn btn-info">
          View
        </button>
      </td>
    </tr>
  );
}

// ... (Your existing imports and constants)

function ManageTaskPage() {
  const [tasks, setTasks] = useState([]);
  const [cookies] = useCookies(["token"]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, dateFilter]);

  const fetchTasks = async () => {
    try {
      const response = await ax.get("/tasks", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      let filteredTasks = response.data.tasks;
      filteredTasks = filterTasksByStatus(filteredTasks);
      filteredTasks = filterTasksByDate(filteredTasks);
      setTasks(filteredTasks);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  const filterTasksByStatus = (tasks) => {
    if (!statusFilter) return tasks; // If no status filter is selected, return all tasks
    return tasks.filter((task) => task.status === statusFilter);
  };

  const filterTasksByDate = (tasks) => {
    if (!dateFilter) return tasks; // If no date filter is selected, return all tasks
    return tasks.filter(
      (task) => new Date(task.deadLine).toLocaleDateString() === dateFilter
    );
  };

  const moveTask = (dragIndex, hoverIndex) => {
    const updatedTasks = [...tasks];
    const draggedTask = updatedTasks[dragIndex];
    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(updatedTasks);
  };

  const handleDelete = async (id) => {
    try {
      //delete the task
      await ax.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      {/* Status and Date Filters */}
      <div className="row mb-3">
        <div className="col">
          <label>Status Filter:</label>
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="todo">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Completed</option>
          </select>
        </div>
        <div className="col">
          <label>Date Filter:</label>
          <input
            type="date"
            className="form-control"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      <h2>Task List</h2>
      <Link to="/home/create-task" className="btn btn-primary mb-3">
        Create New Task
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <Task
              key={task._id}
              task={task}
              index={index}
              moveTask={moveTask}
              handleDelete={handleDelete}
              handleTaskClick={handleTaskClick}
            />
          ))}
        </tbody>
      </table>
      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        {selectedTask && (
          <div>
            <h3>{selectedTask.title}</h3>
            <p>{selectedTask.description}</p>
            <p>
              Deadline:{" "}
              {new Date(selectedTask.deadLine).toLocaleString("en-US", {
                hour12: true,
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <p>Status: {selectedTask.status}</p>
            <button
              onClick={() => setShowModal(false)}
              className="btn btn-primary"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ManageTaskPage;
