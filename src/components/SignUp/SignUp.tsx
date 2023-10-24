import { FC, useState } from "react";
import "./SignUp.scss";
import useInput from "../../hooks/useInput";
import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import MyCheckBox from "../UI/MyCheckBox/MyCheckBox";
import { SignupText } from "../../utils/constants";

const SignUp: FC = () => {
  //TODO let isAuth = false; - Заготовка под авторизацию пользователей
  const [error] = useState("");

  const firstname = useInput(
    "",
    {
      isEmpty: true,
      minLength: 2,
      maxLength: 40,
      isName: true,
    },
    { trim: true }
  );

  const secondname = useInput(
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
    minLength: 6,
    maxLength: 32,
  });

  return (
    <>
      <MyInput data={firstname} label="Имя" />
      <MyInput data={secondname} label="Фамилия" />
      <MyInput data={email} label="E-mail" />
      <MyInput data={password} label="Password" variant="password" />

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
          onChange={() => {}}
          disabled={
            !!email.error ||
            !!password.error ||
            !!firstname.error ||
            !!secondname.error ||
            Boolean(error)
          }
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
          onChange={() => {}}
          disabled={
            !!email.error ||
            !!password.error ||
            !!firstname.error ||
            !!secondname.error ||
            Boolean(error)
          }
        />

        <MyButton
          className="myAuthForm__button"
          label="Зарегистрироваться"
          type="submit"
          onClick={() => {
            console.log("Yes!");
          }}
          disabled={
            !!email.error ||
            !!password.error ||
            !!firstname.error ||
            !!secondname.error ||
            Boolean(error)
          }
        />

        <p className="myAuthForm__question">
          {SignupText.isLoggedInText}
          <span className="myAuthForm__login-btn">{SignupText.linkText}</span>
        </p>
      </div>
    </>
  );
};

export default SignUp;
