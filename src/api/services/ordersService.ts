import { IOrdersResponse } from "../../types";
import api from "../api";

const ordersService = {
  getOrdersList: async (): Promise<IOrdersResponse> => {
    const response = await api.get<IOrdersResponse>("/orders", {});
    console.log(response.data);
    return response.data;
  },

  postMessage: async (body: string): Promise<void> => {
    await api.post<string>(`/chats/`, body, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  },
};
export default ordersService;
