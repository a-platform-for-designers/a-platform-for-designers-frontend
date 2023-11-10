import { IAuthUserRequest, IToken } from "../types";
import api from "./api";

const authService = {
  login: async (data: IAuthUserRequest): Promise<IToken> => {
    const response = await api.post<IToken>("/auth/token/login", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post<IToken>(
      "/auth/token/login",
      {},
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
  },
};

export default authService;
