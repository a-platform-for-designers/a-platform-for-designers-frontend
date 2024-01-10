import {
  IChat,
  ICreateChat,
  IChatResponse,
  IMessage,
  ISendMessage,
  ISendFileResponse,
} from "../../types";
import api from "../api";

const chartsService = {
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

  sendMessage: async (data: ISendMessage): Promise<IMessage> => {
    const response = await api.post(`/send_message/`, data);
    return response.data;
  },

  sendFile: async (data: FormData): Promise<ISendFileResponse> => {
    const response = await api.post(`/files/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default chartsService;
