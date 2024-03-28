const sendEmailTimeout = 60;
import {
  hideScreen,
  requestActivateAccount,
  resetAuthErrors,
} from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import React, { useCallback, useEffect, useState } from "react";
import { resetUser } from "@/redux/slices/userSlice";
import { MyButton, MyInput } from "@/shared/UI";
import useInput from "@/hooks/useInput";
import { CircularProgress } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import "./Activate.scss";

const Activate: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, errorMessages } = useAppSelector((state) => state.auth);
  const [time, setTime] = useState<number>(0);
  const hasError = !!errorMessages.length;
  const isLoading = loading === "pending";

  const email = useInput(
    "",
    {
      isEmpty: true,
      minLength: 6,
      maxLength: 70,
      isEmail: true,
    },
    { trim: true }
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(resetUser());
      const response = await dispatch(
        requestActivateAccount({ email: email.value })
      );
      if (!("error" in response)) {
        setTime(sendEmailTimeout);
      }
    },
    [dispatch, email]
  );

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

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [time]);

  const handleClose = () => {
    dispatch(hideScreen());
  };

  return (
    <form className="activation__from" onSubmit={handleSubmit}>
      {!time && !hasError ? (
        <>
          <p className="activation__subtitle">
            Введите email, на который регистрировали аккаунт. Мы пришлём ссылку
            с активацией аккаунта.
          </p>{" "}
          <MyInput data={email} label="E-mail" />
          <MyButton
            className="myAuthForm__success-button activation__success-button"
            type="submit"
            disabled={isLoading || !!email.error}
          >
            {isLoading && (
              <CircularProgress size={20} color="secondary" sx={{ mr: 2 }} />
            )}
            Запросить активацию
          </MyButton>
        </>
      ) : (
        <>
          <div className="activate__timer-wrapper">
            Письмо отправлено. Отправить письмо повторно можно через:{" "}
            <span className="activate__timer"> {time} c</span>
          </div>
          <MyButton onClick={handleClose}>Закрыть</MyButton>
        </>
      )}
    </form>
  );
};

export default Activate;
