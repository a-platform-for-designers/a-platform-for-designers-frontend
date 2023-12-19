import { ICase, ICaseCreation, ICaseRespons } from "../../types";
import api from "../api";

const casesService = {
  getCasesList: async (limit: number, page: number): Promise<ICaseRespons> => {
    const response = await api.get<ICaseRespons>("/cases", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        limit: limit,
        page: page,
      },
    });
    return response.data;
  },

  getCaseById: async (id: number): Promise<ICase> => {
    const response = await api.get<ICase>(`/cases/${id}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  createCase: async (data: ICaseCreation): Promise<ICase> => {
    const response = await api.post<ICase>("/cases/", data);
    console.log(response.data);
    return response.data;
  },
};

export default casesService;
