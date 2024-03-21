const sendEmailTimeout = 60;
import { objFromUseInput } from "@/hooks/useInput";
import { requestActivateAccount } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";
import React, { useEffect, useState } from "react";
import { resetUser } from "@/redux/slices/userSlice";
import { MyButton, MyInput } from "@/shared/UI";

interface IActivateProps {
  email: objFromUseInput;
}

const Activate: React.FC<IActivateProps> = ({ email }) => {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState<number>(0);

  async function requestActivation() {
    dispatch(resetUser());
    await dispatch(requestActivateAccount({ email: email.value }));
    setTime(sendEmailTimeout);
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <>
      <h1 className="activation__title">Повторная активация аккаунта</h1>
      <p className="activation__subtitle">
        Введите email, на который регистрировали аккаунт. Мы пришлём ссылку с
        активацией аккаунта.
      </p>
      {!time ? (
        <>
          {" "}
          <MyInput data={email} label="E-mail" />
          <MyButton
            className="myAuthForm__success-button"
            onClick={requestActivation}
          >
            Запросить активацию
          </MyButton>
        </>
      ) : (
        <div className="activate__timer-wrapper">
          Письмо отправлено. Отправить письмо повторно через:{" "}
          <span className="activate__timer"> {time} c</span>
        </div>
      )}
    </>
  );
};

export default Activate;
