import { FC, useEffect, useState } from "react";
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
} from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface IConfirmPasswordProps {
  uid?: string;
  token?: string;
  onClose: () => void;
}

const ConfirmPassword: FC<IConfirmPasswordProps> = ({
  uid,
  token,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { errorMessages } = useAppSelector((state) => state.auth);
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const navigate = useNavigate();

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
      onClose();
      navigate("/");
    } else {
      await dispatch(
        confirmPasswordThunk({ new_password: password.value, uid, token })
      );
      setIsPasswordSet(true);
    }
  }

  return (
    <div className="confirm-password">
      <div className="confirm-password__form-wrapper">
        <form className="confirm-password__form" onSubmit={handleSubmit}>
          <div className="confirm-password__header">
            {isPasswordSet && (
              <CheckRoundedIcon
                sx={{
                  fontSize: 64,
                  color: "#27AE60",
                  backgroundColor: "rgba(39, 174, 96, 0.12)",
                  borderRadius: "50%",
                  mb: 2,
                }}
              />
            )}
            <h1 className="confirm-password__title">
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
                (!!password.error ||
                  confirmPassword.value !== password.value) &&
                !isPasswordSet
              }
            >
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
