import { useNavigate } from "react-router-dom";
import MyButton from "@/shared/UI/MyButton/MyButton";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { objFromUseInput } from "@/hooks/useInput";

interface ISuccessProps {
  onActivateRequest?: () => void;
  onClose?: () => void;
  email: objFromUseInput;
}

const Success: React.FC<ISuccessProps> = ({ email, onActivateRequest, onClose }) => {
  const navigate = useNavigate();

  function navigateToHome() {
    navigate("/");
    onClose && onClose();
  }

  return (
    <div>
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
        Подтвердите свою регистрацию на указанной Вами почтовом адресе{" "}
        {email.value}
      </p>
      <p>
        1 вариант- Теперь вам доступны контакты дизайнеров, возможность выложить
        портфолио и поиск менторов
      </p>
      <p>
        2 вариант - Добавьте портфолио и расскажите о себе в личном кабинете
      </p>

      <p className="myAuthForm__question">
        Не получали письмо с активацией аккаунта?
        <span className="myAuthForm__login-btn" onClick={onActivateRequest}>
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
