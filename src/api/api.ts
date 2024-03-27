import { API_PATH, CLIENT_API_ERRORS, errorsMap } from "@/constants/constants";
import { TokenManager } from "@/features/tokenManager";
import axios from "axios";

const api = axios.create({
  baseURL: API_PATH,
  headers: { "Content-Type": "application/json" },
});

export const tokenManager = new TokenManager(api);

export class RestApiErrors extends Error {
  messages: string[];
  constructor(messages: string[]) {
    super(messages.join("\n"));
    this.messages = messages;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const { response } = error;
    if (!response) {
      return Promise.reject(
        new RestApiErrors([CLIENT_API_ERRORS.UNKNOWN_ERROR])
      );
    }

    const statusCode = response.status;
    if (statusCode === 401) {
      tokenManager.clearToken();
      return Promise.reject(
        new RestApiErrors([CLIENT_API_ERRORS.UNAUTHORIZED_ACCESS])
      );
    }

    if (statusCode === 500) {
      return Promise.reject(
        new RestApiErrors([CLIENT_API_ERRORS.SERVER_ERROR])
      );
    }

    const { data } = response;
    if (!data) {
      return Promise.reject(
        new RestApiErrors([CLIENT_API_ERRORS.UNKNOWN_ERROR])
      );
    }

    if (statusCode === 403) {
      const { detail } = data;
      return Promise.reject(
        new RestApiErrors([errorsMap.get(detail) || detail?.toLowerCase()])
      );
    }

    const errorsEntries: [string, string[]][] = Object.entries(data);
    const messages = errorsEntries
      .map(([key, errors]) => errors.map((error: string) => [key, error]))
      .flat()
      .map(
        ([key, errorValue]) =>
          errorsMap.get(errorValue) || `${key} - ${errorValue?.toLowerCase()}`
      );

    if (messages.length) {
      return Promise.reject(new RestApiErrors(messages));
    }

    return Promise.reject(new RestApiErrors([CLIENT_API_ERRORS.UNKNOWN_ERROR]));
  }
);

export default api;
