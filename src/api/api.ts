import axios from "axios";

const api = axios.create({
  baseURL: "http://46.183.163.139/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
