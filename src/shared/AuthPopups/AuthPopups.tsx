import SignIn from "../SignIn/SignIn";
import UserRole from "../UserRole/UserRole";
import SignUp from "../SignUp/SignUp";
import ResetPassword from "../ResetPassword/resetPassword";
import { Screens } from "@/types";
import { StyledEngineProvider } from "@mui/material";
import AuthScreen from "./components/AuthScreen/AuthScreen";
import { MyAuthForm } from "../UI";
import Activate from "../Activate/Activate";
import SignUpSuccess from "@/shared/SignUpSuccess/SignUpSuccess";
import ConfirmPassword from "../ConfirmPassword/confirmPassword";

const AuthScreens = () => {
  return (
    <StyledEngineProvider injectFirst>
      <AuthScreen screen={Screens.SignIn}>
        <MyAuthForm title="Вход">
          <SignIn />
        </MyAuthForm>
      </AuthScreen>

      <AuthScreen screen={Screens.SignUp}>
        <MyAuthForm title="Регистрация">
          <SignUp />
        </MyAuthForm>
      </AuthScreen>

      <AuthScreen screen={Screens.PasswordRecovery}>
        <ResetPassword />
      </AuthScreen>

      <AuthScreen screen={Screens.ConfirmPassword}>
        <ConfirmPassword />
      </AuthScreen>

      <AuthScreen screen={Screens.UserRole}>
        <UserRole />
      </AuthScreen>

      <AuthScreen screen={Screens.SignUpSuccess}>
        <SignUpSuccess />
      </AuthScreen>

      <AuthScreen screen={Screens.Activation}>
        <MyAuthForm title="Активация аккаунта">
          <Activate />
        </MyAuthForm>
      </AuthScreen>
    </StyledEngineProvider>
  );
};

export default AuthScreens;
