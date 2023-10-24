import { FC, useState } from "react";
import "./SignIn.scss";
import useInput from "../../hooks/useInput";
import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import { SigninText } from "../../utils/constants";

const SignIn: FC = () => {
  //TODO let isAuth = false;
  const [error] = useState("");

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
      <MyInput data={email} label="E-mail" />
      <MyInput data={password} label="Password" variant="password" />

      <div className="myAuthForm__lower-part">
        {error && (
          <span className="myAuthForm__error myAuthForm__error_type_bottom">
            {error}
          </span>
        )}
        <a href="#" className="myAuthForm__forget-passwor">
          Забыли пароль?
        </a>
        <MyButton
          className="myAuthForm__button"
          label="Войти"
          type="submit"
          onClick={() => {
            console.log("Yes!");
          }}
          disabled={!!email.error || !!password.error || Boolean(error)}
        />

        <p className="myAuthForm__question">
          {SigninText.isRegistredText}
          <span className="myAuthForm__login-btn">{SigninText.linkText}</span>
        </p>
      </div>
    </>
  );
};

export default SignIn;
