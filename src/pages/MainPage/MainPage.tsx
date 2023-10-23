import MyButton from "../../components/UI/MyButton/MyButton";
import MyInput from "../../components/UI/MyInput/MyInput";
import useInput from "../../hooks/useInput";
import "./MainPage.scss";

const MainPage: React.FC = () => {
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
    </div>
  );
};

export default MainPage;
