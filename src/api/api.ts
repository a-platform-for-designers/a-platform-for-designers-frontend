import { API_PATH, CLIENT_API_ERRORS, errorsMap } from "@/constants/constants";
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: API_PATH,
});

export const setDefaultAPIHeaders = () => {
  const token = localStorage.getItem("token");
  api.defaults.headers.common["Authorization"] = token
    ? `Token ${token}`
    : undefined;
  api.defaults.headers.common["Content-Type"] = "application/json";
};

setDefaultAPIHeaders();

export class RestApiErrors extends Error {
  messages: string[];
  constructor(messages: string[]) {
    super(messages.join("\n"));
    this.messages = messages;
  }
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      let messages: string[] = [];
      const response = error?.response;
      const statusCode = response?.status;

      if (response) {
        if (statusCode === 401) {
          messages = [CLIENT_API_ERRORS.UNAUTHORIZED_ACCESS];
        } else if (statusCode === 400) {
          const errorsValues: string[][] = Object.values(response.data);
          messages = errorsValues
            .flat()
            .map((error) => errorsMap.get(error) || error);
        }
      }

      return Promise.reject(new RestApiErrors(messages));
    }
    return Promise.reject(error);
  },
);

export default api;
