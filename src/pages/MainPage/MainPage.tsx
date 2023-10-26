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
import MySwiper from "../../components/UI/MySwiper/MySwiper";

const MainPage: React.FC = () => {
  const [isAgree, setIsAgree] = useState(false);

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
      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <MySwiper />
        <MySwiper />
      </div>
    </div>
  );
};

export default MainPage;
