import axios from "axios";

const ax = axios.create({
  baseURL: "http://localhost:4000",
});

export default ax;
