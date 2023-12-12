import {
  ICreateUserRequest,
  IUserShort,
  IUser,
  IUserRespons,
  IUpdateInfoUserMe,
} from "../../types";
import api from "../api";
import { enqueueSnackbar } from "notistack";

const userService = {
  createUser: async (data: ICreateUserRequest): Promise<IUserShort> => {
    const response = await api.post<IUserShort>("/users/", data);
    return response.data;
  },

  getUserById: async (id: number): Promise<IUser> => {
    const response = await api.get<IUser>(`/users/${id}/`);
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

  updateInfoUserMe: async (
    body: IUpdateInfoUserMe
  ): Promise<IUpdateInfoUserMe> => {
    try {
      const response = await api.post<IUpdateInfoUserMe>(
        `/profile_designer/`,
        body,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      enqueueSnackbar({
        variant: "success",
        message: `Данные успешно обновлены`,
      });
      return response.data;
    } catch (error) {
      enqueueSnackbar({
        variant: "error",
        message: `Введены некорректные данные`,
      });
      console.log(error);
      throw error;
    }
  },

  getUsersList: async (limit: number, page: number): Promise<IUserRespons> => {
    const response = await api.get<IUserRespons>("/users/", {
      params: {
        limit: limit,
        page: page,
      },
    });
    return response.data;
  },

  getMentorsList: async (
    limit: number,
    page: number
  ): Promise<IUserRespons> => {
    const response = await api.get<IUserRespons>("/mentors/", {
      params: {
        limit: limit,
        page: page,
      },
    });
    return response.data;
  },
};

export default userService;
