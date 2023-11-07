import { ICase, ICaseRespons } from "../types";
import api from "./api";

const casesService = {
  getCasesList: async (limit: number, page: number): Promise<ICaseRespons> => {
    const token = `Token ${localStorage.getItem("token")}` || "";
    const response = await api.get<ICaseRespons>("/cases", {
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

  getCaseById: async (id: number): Promise<ICase> => {
    const response = await api.post<ICase>(
      `/cases/${id}`,
      {},
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  },
};

export default casesService;
