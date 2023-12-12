import api from "../api";
import { ICaseRespons, IOrdersResponse, IUserRespons } from "../../types";

export const filterService = {
  getQuerySpecializations: async (
    idsArray: number[],
    limit: number,
    page: number
  ): Promise<ICaseRespons> => {
    const formattedArray = idsArray
      .map((id) => `specialization=${id}`)
      .join("&");
    const formattedEndpoint = `/cases/?${formattedArray}&limit=${limit}&page=${page}`;
    const response = await api.get<ICaseRespons>(formattedEndpoint);
    console.log(response.data);

    return response.data;
  },

  getQueryOrders: async (
    spheresId: number[],
    specializationId: number[],
    limit: number,
    page: number
  ): Promise<IOrdersResponse> => {
    const formattedSpecializationArray = specializationId
      .map((id) => `specialization=${id}`)
      .join("&");
    const formattedSphereArray = spheresId
      .map((id) => `sphere=${id}`)
      .join("&");
    const response =
      await api.get<IOrdersResponse>(`/orders/?limit=${limit}&page=${page}&${formattedSpecializationArray}&${formattedSphereArray}
    `);
    return response.data;
  },

  getQueryUsers: async (
    spheresId: number[],
    specializationId: number[],
    toolsId: number[],
    limit: number,
    page: number
  ): Promise<IUserRespons> => {
    const formattedSpecializationArray = specializationId
      .map((id) => `specialization=${id}`)
      .join("&");
    const formattedSphereArray = spheresId
      .map((id) => `sphere=${id}`)
      .join("&");
    const formattedToolsArray = toolsId
      .map((id) => `instrument=${id}`)
      .join("&");
    const response =
      await api.get<IUserRespons>(`/users/?limit=${limit}&page=${page}&${formattedSpecializationArray}&${formattedSphereArray}&${formattedToolsArray}
    `);
    return response.data;
  },
};
