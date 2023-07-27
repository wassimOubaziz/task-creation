import axios from "axios";

const ax = axios.create({
  baseURL: "https://task-managements.onrender.com",
});

export default ax;
