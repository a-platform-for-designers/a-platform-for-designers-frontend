import { enqueueSnackbar } from "notistack";
import { IProfileDesignerPost } from "../../types";
import api from "../api";

const resumeService = {
  postProfileDesigner: async (
    data: IProfileDesignerPost
  ): Promise<IProfileDesignerPost> => {
    try {
      const response = await api.post<IProfileDesignerPost>(
        "/profile_designer/",
        data
      );
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
