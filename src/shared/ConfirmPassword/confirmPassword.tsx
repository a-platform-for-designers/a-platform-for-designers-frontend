import { FC, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import useInput from "../../hooks/useInput";
import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import { confirmPasswordText } from "@/constants/constants";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import "./confirmPassword.scss";
import {
  resetAuthErrors,
  confirmPassword as confirmPasswordThunk,
  hideScreen,
} from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";




const ConfirmPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    errorMessages,
    loading,
    extraData,
  } = useAppSelector((state) => state.auth);
  const uid = extraData?.uid as string
  const token = extraData?.token as string

  const hasError = !!errorMessages.length;
  const isLoading = loading === "pending";
  const isPasswordSet = loading === "succeeded";

  useEffect(() => {
    errorMessages.forEach((message) => {
      enqueueSnackbar({
        variant: "error",
        message,
      });
    });
    return () => {
      dispatch(resetAuthErrors());
    };
  }, [errorMessages, dispatch]);

  const password = useInput("", {
    isEmpty: true,
    minLength: 8,
    maxLength: 32,
    isPassword: true,
  });

  const confirmPassword = useInput("", {
    isEmpty: true,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isPasswordSet) {
      dispatch(hideScreen())
      navigate("/");
    } else {
      await dispatch(
        confirmPasswordThunk({ new_password: password.value, uid, token })
      );
    }
  }

  return (
    <div className="confirm-password">
      <div className="confirm-password__form-wrapper">
        <form className="confirm-password__form" onSubmit={handleSubmit}>
          <div className="confirm-password__header">
            {isPasswordSet && (
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <CheckRoundedIcon
                  sx={{
                    fontSize: 64,
                    color: "#27AE60",
                    backgroundColor: "rgba(39, 174, 96, 0.12)",
                    borderRadius: "50%",
                    mb: 2,
                  }}
                />
              </div>
            )}
            <h1
              className="confirm-password__title"
              {...(isPasswordSet ? { style: { textAlign: "center" } } : {})}
            >
              {isPasswordSet
                ? confirmPasswordText.accessRestored
                : confirmPasswordText.setNewPassword}
            </h1>
            {isPasswordSet && (
              <p className="confirm-password__subtitle">
                Вы всегда можете изменить пароль в Личном кабинете
              </p>
            )}
          </div>

          <div className="confirm-password__body">
            {!isPasswordSet && (
              <>
                <MyInput data={password} label="Пароль" variant="password" />
                <MyInput
                  data={{
                    ...confirmPassword,
                    error:
                      confirmPassword.value !== password.value
                        ? "Пароли не совпадают"
                        : confirmPassword.error,
                  }}
                  label="Подтвердите пароль"
                  variant="password"
                />
              </>
            )}
          </div>

          <div className="confirm-password__footer">
            <MyButton
              className="confirm-password__button"
              type="submit"
              disabled={
                hasError ||
                isLoading ||
                ((!!password.error ||
                  confirmPassword.value !== password.value) &&
                  !isPasswordSet)
              }
            >
              {isLoading && (
                <CircularProgress size={20} color="secondary" sx={{ mr: 2 }} />
              )}
              {isPasswordSet
                ? confirmPasswordText.home
                : confirmPasswordText.signIn}
            </MyButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmPassword;
