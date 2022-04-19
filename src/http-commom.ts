import axios from "axios";
export default axios.create({
  baseURL: "https://localhost:7240/api/Menu",
  headers: {
    "Content-type": "application/json"
  }
});