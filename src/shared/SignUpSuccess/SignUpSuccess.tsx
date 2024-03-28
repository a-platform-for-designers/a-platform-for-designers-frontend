import { useNavigate } from "react-router-dom";
import MyButton from "@/shared/UI/MyButton/MyButton";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setCurrentScreen, hideScreen } from "@/redux/slices/authSlice";
import { Screens } from "@/types";
import "./SignUpSuccess.scss";

const Success: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { extraData: { email = "" } = {} } = useAppSelector(
    (state) => state.auth
  );
  function navigateToHome() {
    dispatch(hideScreen());
    navigate("/");
  }

  function openActivationPopup() {
    dispatch(
      setCurrentScreen({
        screen: Screens.Activation,
      })
    );
  }

  return (
    <div className="sign-up-success">
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <CheckRoundedIcon
          sx={{
            fontSize: 64,
            color: "#27AE60",
            backgroundColor: "rgba(39, 174, 96, 0.12)",
            borderRadius: "50%",
            mb: 2,
          }}
        />
      </div>
      <p className="myAuthForm__success-title">
        Вы успешно зарегистрировались.
      </p>
      <p className="myAuthForm__success-subtitle">
        Подтвердите свою регистрацию на указанном Вами почтовом адресе{" "}
        {email as string}
      </p>
      <p>
        Заказчик - Теперь вам доступны контакты дизайнеров, возможность выложить
        портфолио и поиск менторов
      </p>
      <p>Дизайнер - Добавьте портфолио и расскажите о себе в личном кабинете</p>

      <p className="myAuthForm__question">
        Не получали письмо с активацией аккаунта?
        <span className="myAuthForm__login-btn" onClick={openActivationPopup}>
          Запросить письмо с активацией
        </span>
      </p>

      <MyButton className="myAuthForm__success-button" onClick={navigateToHome}>
        На главную
      </MyButton>
    </div>
  );
};

export default Success;
