import SignUp from "../../components/SignUp/SignUp";
import SignIn from "../../components/SignIn/SignIn";
import MyAuthForm from "../../components/UI/MyAuthForm/MyAuthForm";
import MyButton from "../../components/UI/MyButton/MyButton";
import MyCheckBox from "../../components/UI/MyCheckBox/MyCheckBox";
import MyInput from "../../components/UI/MyInput/MyInput";
import MyPopup from "../../components/UI/MyPopup/MyPopup";
import useInput from "../../hooks/useInput";
import "./MainPage.scss";
import { useState } from "react";

const MainPage: React.FC = () => {
  const [isAgree, setIsAgree] = useState(false);

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

  const password = useInput("", {
    isEmpty: true,
    minLength: 6,
    maxLength: 32,
  });

  const tel = useInput("", {
    isEmpty: true,
    minLength: 10,
    maxLength: 12,
    isPhone: true,
  });

  return (
    <div>
      MainPage
      <hr />
      <MyInput
        data={firstname}
        variant="text"
        label="Имечко"
        placeholder="Вася"
        disabled
      />
      <hr />
      <MyInput
        data={password}
        variant="password"
        label="Паролик"
        placeholder="****"
      />
      <hr />
      <MyInput
        data={tel}
        variant="text"
        label="Телефон"
        placeholder="+7912315418"
      />
      <hr />
      <MyButton label="Text" onClick={() => {}} />
      <hr />
      <MyButton label="Text" onClick={() => {}} disabled />
      <hr />
      <MyButton label="Text" onClick={() => {}} variant="text" />
      <hr />
      <MyButton label="Text" onClick={() => {}} disabled variant="text" />
      <hr />
      <MyCheckBox label="Yes" onChange={() => setIsAgree((prev) => !prev)} />
      <MyButton
        label="Yes checked"
        onClick={() => {}}
        disabled={!isAgree}
        variant="text"
      />
      <hr />
      <hr />
      <MyPopup label="Регистрация">
        <MyAuthForm title="Регистрация">
          <SignUp />
        </MyAuthForm>
      </MyPopup>
      <MyPopup label="Вход">
        <MyAuthForm title="Вход">
          <SignIn />
        </MyAuthForm>
      </MyPopup>
    </div>
  );
};

export default MainPage;
