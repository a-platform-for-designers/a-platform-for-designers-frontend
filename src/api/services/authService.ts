import { IActivationData, IActivationResendData, IAuthUserRequest, IResetPasswordConfirmData, IToken } from "@/types";
import api from "../api";

const authService = {
  login: async (data: IAuthUserRequest): Promise<IToken> => {
    const response = await api.post<IToken>("/auth/token/login", data);
    return response.data;
  },
  logout: async (): Promise<void> => {
    await api.post<IToken>("/auth/token/logout");
  },
  resetPassword: async (email: string): Promise<void> => {
    await api.post<IToken>("/auth/users/reset_password/", { email });
  },
  resetPasswordConfirm: async (
    data: IResetPasswordConfirmData
  ): Promise<IResetPasswordConfirmData> => {
    const response = await api.post<IResetPasswordConfirmData>(
      "/auth/users/reset_password_confirm/",
      data
    );
    return response.data;
  },
  activation: async (
    data: IActivationData
  ): Promise<IActivationData> => {
    const response = await api.post<IActivationData>(
      "/auth/users/activation/",
      data
    );
    return response.data;
  },
  activationResend: async (
    data: IActivationResendData
  ): Promise<IActivationResendData> => {
    const response = await api.post<IActivationResendData>(
      "/auth/users/resend_activation/",
      data
    );
    return response.data;
  },
};

export default authService;
