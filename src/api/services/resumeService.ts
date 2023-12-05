import { IResumeNew } from "../../types";
import api from "../api";

const resumeService = {
  postResume: async (data: IResumeNew): Promise<IResumeNew> => {
    const response = await api.post<IResumeNew>("/resume/", data, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    return response.data;
  },
};

export default resumeService;
