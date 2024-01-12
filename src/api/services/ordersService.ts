import {
  IOrdersResponse,
  IOrderResponse,
  IOrderInfoResponse,
} from "../../types";
import api from "../api";

const ordersService = {
  getOrdersList: async (
    limit: number,
    page: number
  ): Promise<IOrdersResponse> => {
    const response = await api.get<IOrdersResponse>("/orders", {
      params: {
        limit: limit,
        page: page,
      },
    });
    return response.data;
  },

  getOrdersListWithoutParams: async (): Promise<IOrdersResponse> => {
    const response = await api.get<IOrdersResponse>("/orders", {});
    return response.data;
  },

  getOrderInfo: async (id: number): Promise<IOrderInfoResponse> => {
    const response = await api.get<IOrderInfoResponse>(`/orders/${id}/`);
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

  patchResponseOrder: async (
    body: IOrderResponse,
    id: number
  ): Promise<void> => {
    await api.patch(`/orders/${id}/publish/`, body);
  },
};
export default ordersService;
