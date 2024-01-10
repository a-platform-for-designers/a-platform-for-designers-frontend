import { enqueueSnackbar } from "notistack";
import { IProfileDesignerPost, IUpdateInfoMeCustomer } from "../../types";
import api from "../api";

const profileService = {
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
  postProfileCustomer: async (
    data: IUpdateInfoMeCustomer
  ): Promise<IUpdateInfoMeCustomer> => {
    try {
      const response = await api.post<IUpdateInfoMeCustomer>(
        "/profile_customer/",
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

export default profileService;
