import { enqueueSnackbar } from "notistack";
import { IPostMentoring } from "../../types";
import api from "../api";

const mentoringService = {
  postMentoring: async (data: IPostMentoring): Promise<IPostMentoring> => {
    try {
      const response = await api.post<IPostMentoring>("/mentoring/", data);
      enqueueSnackbar({
        variant: "success",
        message: `Данные успешно обновлены`,
      });
      return response.data;
    } catch (error) {
      enqueueSnackbar({
        variant: "error",
        message: `Заполните все поля`,
      });
      throw error;
    }
  },
};

export default mentoringService;
