import { IAuthUserRequest, IToken } from "../../types";
import api from "../api";

const authService = {
  login: async (data: IAuthUserRequest): Promise<IToken> => {
    try {
      const response = await api.post<IToken>("/auth/token/login", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    await api.post<IToken>(
      "/auth/token/logout",
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
