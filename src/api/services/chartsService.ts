import { IChat, ICreateChat, IChatResponse } from "../../types";
import api from "../api";

export const chartService = {
  createChat: async (data: ICreateChat): Promise<ICreateChat> => {
    const response = await api.post<ICreateChat>("/chats/", data);
    return response.data;
  },

  getChat: async (id: number): Promise<IChat> => {
    const response = await api.get<IChat>(`/chats/${id}/`);
    return response.data;
  },

  getChats: async (): Promise<IChatResponse> => {
    const response = await api.get(`/chats/`);
    return response.data;
  },
};
