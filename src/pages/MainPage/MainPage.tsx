import SignUp from "../../components/SignUp/SignUp";
import MyAuthForm from "../../components/UI/MyAuthForm/MyAuthForm";
import MyButton from "../../components/UI/MyButton/MyButton";
import MyCheckBox from "../../components/UI/MyCheckBox/MyCheckBox";
import MyDropDown from "../../components/UI/MyDropDown/MyDropDown";
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

  const [name, setName] = useState<string | null>(null);

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
      <MyDropDown
        options={["1", "2", "3"]}
        value={name}
        onChange={(
          _: React.SyntheticEvent<Element, Event>,
          newValue: string | null
        ) => setName(newValue)}
      ></MyDropDown>
      <hr />
      <MyPopup>
        <MyAuthForm title="Регистрация">
          <SignUp />
        </MyAuthForm>
      </MyPopup>
    </div>
  );
};

export default MainPage;
