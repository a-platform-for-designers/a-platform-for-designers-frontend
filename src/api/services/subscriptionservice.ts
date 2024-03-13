import { IUser, ISubscriptionsResult, IFollowersCount } from "../../types";
import api from "../api";
import { enqueueSnackbar } from "notistack";

export const subscriptionService = {
  postSubscription: async (id: number): Promise<IUser> => {
    const response = await api.post<IUser>(`/users/${id}/subscribe/`);
    enqueueSnackbar("Вы подписались на обновления", {
      variant: "success",
    });
    return response.data;
  },

  deleteSubscription: async (id: number): Promise<IUser> => {
    const response = await api.delete<IUser>(`/users/${id}/subscribe/`);
    enqueueSnackbar("Вы отписались от обновлений", {
      variant: "success",
    });
    return response.data;
  },

  getSubscriptions: async (
    limit?: number,
    page?: number
  ): Promise<ISubscriptionsResult> => {
    const response = await api.get<ISubscriptionsResult>(
      "/users/subscriptions/",
      {
        params: {
          limit: limit,
          page: page,
        },
      }
    );
    return response.data;
  },

  getFollowers: async (
    limit?: number,
    page?: number
  ): Promise<ISubscriptionsResult> => {
    const response = await api.get<ISubscriptionsResult>(
      "/users/my-subscribers/",
      {
        params: {
          limit: limit,
          page: page,
        },
      }
    );
    return response.data;
  },

  getFollowersById: async (id: number): Promise<IFollowersCount> => {
    const response = await api.get<IFollowersCount>(
      `/users/${id}/subscribers-count/`
    );
    return response.data;
  },
};

export default subscriptionService;
