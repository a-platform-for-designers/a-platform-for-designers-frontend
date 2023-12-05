import { ICase, ICaseRespons } from "../../types";
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
};

export default casesService;
