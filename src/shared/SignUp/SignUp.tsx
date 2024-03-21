import { FC, useEffect, useState } from "react";
import "./SignUp.scss";
import useInput from "../../hooks/useInput";
import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import MyCheckBox from "../UI/MyCheckBox/MyCheckBox";
import { SignupText } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { createUser } from "@/redux/slices/userSlice";
import { resetAuthErrors } from "@/redux/slices/userSlice";
import { enqueueSnackbar } from "notistack";
import SignUpSuccess from "./components/Success/Success";
import Activate from "./components/Activate/Activate";

interface ISignUpProps {
  openSignInPopup: () => void;
  onClose?: () => void;
  isCustomer?: boolean;
}

const SignUp: FC<ISignUpProps> = ({ openSignInPopup, isCustomer, onClose }) => {
  const dispatch = useAppDispatch();
  const { errorMessages, loading } = useAppSelector((state) => state.auth);
  const [confirmPrivatePolicy, setConfirmPrivatePolicy] =
    useState<boolean>(false);
  const [confirmServiceRules, setConfirmServiceRules] =
    useState<boolean>(false);
    const [isActivationOpen, setIsActivationOpen] = useState(false);
    const isSuccessOpen = !isActivationOpen &&  loading === "succeeded";
    const isMainFormOpen = !isActivationOpen &&  !isSuccessOpen;


  const firstName = useInput(
    "",
    {
      isEmpty: true,
      minLength: 2,
      maxLength: 40,
      isName: true,
    },
    { trim: true }
  );

  const lastName = useInput(
    "",
    {
      isEmpty: true,
      minLength: 2,
      maxLength: 40,
      isName: true,
    },
    { trim: true }
  );

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

  const password = useInput("", {
    isEmpty: true,
    minLength: 8,
    maxLength: 32,
    isPassword: true,
  });

  const confirmPassword = useInput("", {
    isEmpty: true,
  });

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      createUser({
        email: email.value,
        first_name: firstName.value,
        last_name: lastName.value,
        is_customer: isCustomer,
        password: password.value,
      })
    );
  }

  function handleActivateRequest() {
    setIsActivationOpen(true);
  }

  return (
    <form className="myAuthForm__signup-form" onSubmit={handleSubmit}>
      {isSuccessOpen && (
        <SignUpSuccess
          email={email}
          onActivateRequest={handleActivateRequest}
          onClose={onClose}
        />
      )}

      {isActivationOpen && <Activate email={email} />}

      {isMainFormOpen  && (
        <>
          <MyInput data={firstName} label="Имя" />
          <MyInput data={lastName} label="Фамилия" />
          <MyInput data={email} label="E-mail" />
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

          <div className="myAuthForm__lower-part">
            <MyCheckBox
              label={
                <p className="myAuthForm__privacy-policy">
                  {SignupText.privacyPolicy}
                </p>
              }
              onChange={() => {
                setConfirmPrivatePolicy((prev) => !prev);
              }}
              checked={confirmPrivatePolicy}
              labelPlacement="end"
            />

            <MyCheckBox
              label={
                <p className="myAuthForm__privacy-policy">
                  {SignupText.conditionsAgreement}{" "}
                  <a
                    href="#"
                    target="_blank"
                    className="myAuthForm__privacy-policy-text"
                  >
                    {SignupText.agreementLink}
                  </a>
                </p>
              }
              onChange={() => {
                setConfirmServiceRules((prev) => !prev);
              }}
              checked={confirmServiceRules}
              labelPlacement="end"
            />

            <MyButton
              className="myAuthForm__button"
              type="submit"
              disabled={
                loading === "pending" ||
                !!email.error ||
                !!password.error ||
                !!firstName.error ||
                !!lastName.error ||
                confirmPassword.value !== password.value ||
                confirmPrivatePolicy === false ||
                confirmServiceRules === false
              }
            >
              Зарегистрироваться
            </MyButton>
          </div>

          <p className="myAuthForm__question">
            {SignupText.isLoggedInText}
            <span className="myAuthForm__login-btn" onClick={openSignInPopup}>
              {SignupText.linkText}
            </span>
          </p>
          <p className="myAuthForm__question">
            Зарегистрировались, но не получили письмо с активацией?
            <span
              className="myAuthForm__login-btn"
              onClick={handleActivateRequest}
            >
              Запросить активацию повторно
            </span>
          </p>
        </>
      )}
    </form>
  );
};

export default SignUp;
