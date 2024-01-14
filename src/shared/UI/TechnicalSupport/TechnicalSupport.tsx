import { Typography, Button, Container } from "@mui/material";
import { MyInput } from "..";
import useInput from "@/hooks/useInput";
import "./TechnicalSupport.scss";
import { userService } from "@/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const TechnicalSupport = ({ onClose }: { onClose: () => void }) => {
  const [isMessageSent, setMessageSent] = useState(false);
  const navigate = useNavigate();
  const name = useInput(
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
  const subject = useInput("", { minLength: 2 }, { trim: true });
  const message = useInput("", { minLength: 2 }, { trim: true });

  //ToDo use Thunk with error handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await userService.getSupport({
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    });
    setMessageSent(true);
  };

  const Success = () => (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <CheckRoundedIcon
        sx={{
          fontSize: 64,
          color: "#27AE60",
          backgroundColor: "rgba(39, 174, 96, 0.12)",
          borderRadius: "50%",
          mb: 2,
        }}
      />
      <Typography variant="h5" sx={{ mb: 2 }}>
        Ваше обращение отправлено
      </Typography>
      <Button
        component="span"
        variant="contained"
        color="primary"
        className="technical-support__success-button"
        onClick={() => {
          onClose();
          navigate("/");
        }}
      >
        Перейти на главную
      </Button>
    </Container>
  );

  return isMessageSent ? (
    <Success />
  ) : (
    <div className="technical-support">
      <form className="technical-support__form" onSubmit={handleSubmit}>
        <h2>Обращение в поддержку</h2>
        <Typography className="technical-support__label">Имя</Typography>
        <MyInput data={name} variant="text-label-without" placeholder="Мария" />
        <Typography className="technical-support__label">Email</Typography>
        <MyInput
          data={email}
          variant="text-label-without"
          placeholder="example@mail.ru"
        />
        <Typography className="technical-support__label">
          Тема обращения
        </Typography>
        <MyInput
          data={subject}
          variant="text-label-without"
          placeholder="Напишите тему обращения"
        />
        <Typography className="technical-support__label">
          Опишите вашу проблему
        </Typography>
        <MyInput
          data={message}
          maxLength={500}
          minRows={10}
          variant="textarea-label-without"
          placeholder="Введите текст сообщения"
        />
        <Button
          className="technical-support__submit-button"
          type="submit"
          onClick={() => {}}
          variant="contained"
          disabled={
            !!name.error || !!email.error || !!subject.error || !!message.error
          }
        >
          Отправить
        </Button>
      </form>
    </div>
  );
};

export default TechnicalSupport;
