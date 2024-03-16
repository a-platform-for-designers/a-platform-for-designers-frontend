import { ICase, ICaseCreation, ICaseRespons, IFavouriteCase } from "@/types";
import api from "../api";

const casesService = {
  getCasesList: async (limit: number, page: number): Promise<ICaseRespons> => {
    const response = await api.get<ICaseRespons>("/cases", {
      params: {
        limit: limit,
        page: page,
      },
    });
    return response.data;
  },

  getCaseById: async (id: number): Promise<ICase> => {
    const response = await api.get<ICase>(`/cases/${id}/`);
    return response.data;
  },

  createCase: async (data: ICaseCreation): Promise<ICase> => {
    const response = await api.post<ICase>("/cases/", data);
    return response.data;
  },

  deleteCase: async (id: number): Promise<ICase> => {
    const response = await api.delete<ICase>(`/cases/${id}/`);
    return response.data;
  },

  editCase: async (id: number, data: ICaseCreation): Promise<ICase> => {
    const response = await api.patch<ICase>(`/cases/${id}/`, data);
    return response.data;
  },

  setFavouriteCase: async (id: number): Promise<void> => {
    await api.post(`/cases/${id}/favorite_case/`);
  },

  getFavouritedCases: async (): Promise<IFavouriteCase[]> => {
    const response = await api.get<IFavouriteCase[]>(`/favorite_cases/`);
    return response.data;
  },
};

export default casesService;
