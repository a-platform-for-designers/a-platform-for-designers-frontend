import { IOrdersResponse } from "../../types";
import api from "../api";

const ordersService = {
  getOrdersList: async (): Promise<IOrdersResponse> => {
    const response = await api.get<IOrdersResponse>("/orders", {});
    return response.data;
  },

  postMessage: async (body: string): Promise<void> => {
    const data = { receiver: body };
    await api.post<string>(`/chats/`, data, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  },
};
export default ordersService;
