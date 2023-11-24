import { API_PATH } from "@/constants/constants";
import axios from "axios";

const api = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
