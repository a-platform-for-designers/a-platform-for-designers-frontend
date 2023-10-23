import { FC, useState } from "react";
import "./SignUp.scss";
import useInput from "../../hooks/useInput";
import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import MyCheckBox from "../UI/MyCheckBox/MyCheckBox";

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

      <div className="signup__wrapper signup__wrapper_type_bottom">
        {error && (
          <span className="signup__error signup__error_type_bottom">
            {error}
          </span>
        )}

        <MyCheckBox
          label={
            <p className="signup__privacy-policy">
              Согласие на обработку персональных данных, разрешенных для
              распространения
            </p>
          }
          onChange={() => {}}
        />

        <MyCheckBox
          label={
            <p className="signup__privacy-policy">
              Нажимая кнопку «Зарегистрироваться» вы соглашаетесь с{" "}
              <a
                href="https://ya.ru/"
                target="_blank"
                className="signup__privacy-policy-text"
              >
                правилами работы сервиса
              </a>
            </p>
          }
          onChange={() => {}}
        />

        <MyButton
          className="signup__button"
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

        <p className="signup__question">
          Уже есть аккаунт?
          <span className="signup__login-btn">Войти</span>
        </p>
      </div>
    </>
  );
};

export default SignUp;
