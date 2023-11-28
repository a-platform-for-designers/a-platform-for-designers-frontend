import { FC, useState } from "react";
import "./SignUp.scss";
import useInput from "../../hooks/useInput";
import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import MyCheckBox from "../UI/MyCheckBox/MyCheckBox";
import { SignupText } from "../../constants/constants";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { createUser } from "@/redux/slices/userSlice";

interface ISignUpProps {
  openSignInPopup: () => void;
  onClose: () => void;
}

const SignUp: FC<ISignUpProps> = ({ openSignInPopup }) => {
  const dispatch = useAppDispatch();
  const [error] = useState("");
  const [confirmPrivatePolicy, setConfirmPrivatePolicy] =
    useState<boolean>(false);
  const [confirmServiceRules, setConfirmServiceRules] =
    useState<boolean>(false);

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
  });

  const confirmPassword = useInput("", {
    isEmpty: true,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      createUser({
        email: email.value,
        first_name: firstName.value,
        last_name: lastName.value,
        is_customer: true,
        password: password.value,
      })
    );
  }

  return (
    <form className="myAuthForm__signup-form" onSubmit={handleSubmit}>
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
        {error && (
          <span className="myAuthForm__error myAuthForm__error_type_bottom">
            {error}
          </span>
        )}

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
            !!email.error ||
            !!password.error ||
            !!firstName.error ||
            !!lastName.error ||
            confirmPassword.value !== password.value ||
            confirmPrivatePolicy === false ||
            confirmServiceRules === false ||
            Boolean(error)
          }
        >
          Зарегистрироваться
        </MyButton>

        <p className="myAuthForm__question">
          {SignupText.isLoggedInText}
          <span className="myAuthForm__login-btn" onClick={openSignInPopup}>
            {SignupText.linkText}
          </span>
        </p>
      </div>
    </form>
  );
};

export default SignUp;
