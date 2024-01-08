import { IOrdersResponse, IOrderResponse } from "../../types";
import api from "../api";

const ordersService = {
  getOrdersList: async (): Promise<IOrdersResponse> => {
    const response = await api.get<IOrdersResponse>("/orders", {});
    return response.data;
  },

  getOrderInfo: async (id: number): Promise<IOrdersResponse> => {
    const response = await api.get<IOrdersResponse>(`/orders/${id}/`);
    return response.data;
  },

  postMessage: async (body: string): Promise<void> => {
    const data = { receiver: body };
    await api.post<string>(`/chats/`, data);
  },

  postResponseOrder: async (
    body: IOrderResponse,
    id: number
  ): Promise<void> => {
    await api.post(`/orders/${id}/respond/`, body);
  },

  deleteResponseOrder: async (
    body: IOrderResponse,
    id: number
  ): Promise<void> => {
    await api.delete(`/orders/${id}/respond/`, { data: body });
  },
};
export default ordersService;
