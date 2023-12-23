import { API_PATH, CLIENT_API_ERRORS, errorsMap } from "@/constants/constants";
import { TokenManager } from "@/features/tokenManager";
import axios from "axios";

const api = axios.create({
  baseURL: API_PATH,
  headers: {"Content-Type": "application/json"}
});

export const tokenManager = new TokenManager(api)

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
          tokenManager.clearToken()
          messages = [CLIENT_API_ERRORS.UNAUTHORIZED_ACCESS];
        } else if (statusCode === 400) {
          const errorsValues: string[][] = Object.values(response.data);
          messages = errorsValues.flat().map(error => errorsMap.get(error) || error)
        } else if (statusCode === 500) {
          messages = [CLIENT_API_ERRORS.SERVER_ERROR];
        }
      }

      return Promise.reject(new RestApiErrors(messages));
    }
    return Promise.reject(error);
  },
);

export default api;
