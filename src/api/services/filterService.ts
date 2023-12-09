import api from "../api";
import { ICaseRespons } from "../../types";

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
};
