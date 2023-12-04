import {
  ICreateUserRequest,
  IUserShort,
  IUser,
  IUserRespons,
  IUpdateInfoUserMe,
} from "../../types";
import api from "../api";

const userService = {
  createUser: async (data: ICreateUserRequest): Promise<IUserShort> => {
    const response = await api.post<IUserShort>("/users/", data);
    return response.data;
  },

  getUserById: async (id: number): Promise<IUser> => {
    const response = await api.post<IUser>(
      `/users/${id}`,
      {},
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  },

  getInfoUserMe: async (): Promise<IUser> => {
    const response = await api.get<IUser>(`/users/me/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  updateInfoUserMe: async (body: IUpdateInfoUserMe): Promise<IUser> => {
    const response = await api.post<IUser>(`/profile_designer/`, body, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  getUsersList: async (limit: number, page: number): Promise<IUserRespons> => {
    const token = `Token ${localStorage.getItem("token")}`;
    const response = await api.get<IUserRespons>("/users/", {
      headers: {
        Authorization: token,
      },
      params: {
        limit: limit,
        page: page,
      },
    });
    return response.data;
  },
};

export default userService;
