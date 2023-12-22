import { IAuthUserRequest, IToken } from "../../types";
import api, { setDefaultAPIHeaders } from "../api";

const authService = {
  login: async (data: IAuthUserRequest): Promise<IToken> => {
    const response = await api.post<IToken>("/auth/token/login", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post<IToken>("/auth/token/logout");
    setDefaultAPIHeaders();
  },
};

export default authService;
