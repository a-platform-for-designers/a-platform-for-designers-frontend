import { FC, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import useInput from "../../hooks/useInput";
import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import { SigninText, resetPasswordText } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import "./resetPassword.scss";
import {
  resetPassword,
  resetAuthErrors,
  setCurrentScreen,
} from "@/redux/slices/authSlice";
import { Screens } from "@/types";
import { CircularProgress } from "@mui/material";

const sendEmailTimeout = 60;

const ResetPassword: FC = () => {
  const dispatch = useAppDispatch();
  const { errorMessages, loading } = useAppSelector((state) => state.auth);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [time, setTime] = useState<number>(0);
  const isLoading = loading === "pending";

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [time]);

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

  const email = useInput(
    "",
    {
      isEmpty: true,
      minLength: 8,
      maxLength: 70,
      isEmail: true,
      badDataError: true,
    },
    { trim: true }
  );

  const handleTimerStart = () => {
    setTime(sendEmailTimeout);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await dispatch(resetPassword(email.value));
    setIsEmailSent(true);
    handleTimerStart();
  }

  function openSignUpPopup() {
    dispatch(setCurrentScreen({ screen: Screens.SignUp }));
  }

  return (
    <div className="restore-password">
      <div className="restore-password__form-wrapper">
        <form className="restore-password__form" onSubmit={handleSubmit}>
          <div className="restore-password__header">
            <h1 className="restore-password__title">Восстановление доступа</h1>
            <p className="restore-password__subtitle">
              {isEmailSent
                ? resetPasswordText.emailSent
                : resetPasswordText.enterEmail}
            </p>
          </div>

          <div className="restore-password__body">
            <MyInput
              data={email}
              label="E-mail"
              {...(time > 0 && { disabled: true })}
            />
          </div>

          <div className="restore-password__footer">
            {isEmailSent && (
              <div className="restore-password__timer-wrapper">
                Отправить письмо повторно через:
                <span className="restore-password__timer"> {time} c</span>
              </div>
            )}
            <MyButton
              className="restore-password__button"
              type="submit"
              disabled={isLoading || !!email.error || !!time}
            >
              {isLoading && (
                <CircularProgress size={20} color="secondary" sx={{ mr: 2 }} />
              )}
              {isEmailSent
                ? resetPasswordText.resendEmail
                : resetPasswordText.restoreAccess}
            </MyButton>
            <p className="restore-password__question">
              {SigninText.isRegistredText}
              <span
                className="restore-password__login-btn"
                onClick={openSignUpPopup}
              >
                {SigninText.linkText}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
