import { enqueueSnackbar } from "notistack";
import { IResumeNew } from "../../types";
import api from "../api";

const resumeService = {
  postResume: async (data: IResumeNew): Promise<IResumeNew> => {
    try {
      const response = await api.post<IResumeNew>("/resume/", data);
      enqueueSnackbar({
        variant: "success",
        message: `Данные успешно обновлены`,
      });
      return response.data;
    } catch (error) {
      enqueueSnackbar({
        variant: "error",
        message: `Заполните хотя бы одно поле`,
      });
      throw error;
    }
  },
};

export default resumeService;
