import {
  ICreateUserRequest,
  IUserShort,
  IUser,
  IUserLike,
  IUserRespons,
  IUpdateInfoUserMe,
  IUpdateInfoMeCustomer,
  ISetNewPassword,
  ISupport,
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
    const response = await api.get<IUser>(`auth/users/me/`);
    return response.data;
  },

  updateInfoUserMe: async (
    body: IUpdateInfoUserMe
  ): Promise<IUpdateInfoUserMe> => {
    try {
      const response = await api.post<IUpdateInfoUserMe>(
        `/profile_designer/`,
        body
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
      throw error;
    }
  },

  updateInfoUserMeCustomer: async (
    body: IUpdateInfoMeCustomer
  ): Promise<IUpdateInfoMeCustomer> => {
    try {
      const response = await api.post<IUpdateInfoMeCustomer>(
        `/profile_customer/`,
        body
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

  getUsersWithoutParams: async (): Promise<IUserRespons> => {
    const response = await api.get<IUserRespons>("/users/");
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

  setNewPassword: async (data: ISetNewPassword): Promise<ISetNewPassword> => {
    try {
      const response = await api.post<ISetNewPassword>(
        `/auth/users/set_password/`,
        data
      );
      enqueueSnackbar({
        variant: "success",
        message: `Пароль успешно обновлен`,
      });
      return response.data;
    } catch (error) {
      if (error) {
        const errorMessage = error
          .toString()
          .split(".")
          .filter((message) => message.trim() !== "");
        const message = errorMessage.map((mes) =>
          mes.replace(/\n/g, "").replace(/^Error: /, "")
        );
        message.forEach((message) => {
          enqueueSnackbar({
            variant: "error",
            message,
          });
        });
      }
      throw error;
    }
  },

  getSupport: async (data: ISupport): Promise<void> => {
    await api.post<ISupport>("/support/", data);
    return;
  },

  setLike: async (id: number, body: IUserLike): Promise<void> => {
    await api.post<IUserLike>(`/users/${id}/like/`, { body });
  },
};

export default userService;
