import { FC, useState } from "react";
import "./SignUpPage.scss";
import useInput from "../../hooks/useInput";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Button from "@mui/material-next/Button";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { StyledEngineProvider } from "@mui/material/styles";

const SignUpPage: FC = () => {
  //TODO 1) Стилизировать элементы MUI
  // ? Обернуть в <StyledEngineProvider injectFirst>
  //TODO 2) Сделать общую часть поп-апа для регистрации и входа
  //TODO 3) Сократить кол-во рендеров
  //TODO let isAuth = false; - Заготовка под авторизацию пользователей
  console.log("render");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword((prev) => !prev);
  }

  const firstname = useInput("", {
    isEmpty: true,
    minLength: 2,
    maxLength: 40,
    isName: true,
  });

  const secondname = useInput("", {
    isEmpty: true,
    minLength: 2,
    maxLength: 40,
    isName: true,
  });

  const email = useInput("", {
    isEmpty: true,
    minLength: 6,
    maxLength: 70,
    isEmail: true,
  });

  const password = useInput("", {
    isEmpty: true,
    minLength: 6,
    maxLength: 32,
  });

  const passwordrepeat = useInput("", {
    isEmpty: true,
    minLength: 6,
    maxLength: 32,
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Wow! Great!");
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    callback: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ) {
    if (error !== "") {
      setError("");
    }
    callback(event);
  }

  type objFromUseInput = ReturnType<typeof useInput>;

  function getError(obj: objFromUseInput) {
    return (
      obj.isDirty &&
      !obj.inputValid &&
      (obj.EmptyError ||
        obj.minLengthError ||
        obj.maxLengthError ||
        obj.nameError ||
        obj.emailError)
    );
  }

  return (
    <StyledEngineProvider injectFirst>
      <form className="signup" onSubmit={onSubmit}>
        <div className="signup__wrapper">
          <h1 className="signup__title">Регистрация</h1>

          <TextField
            variant="outlined"
            label="Имя"
            id="firstname"
            type="firstname"
            name="firstname"
            autoComplete="off"
            className="signup__form-label"
            value={firstname.value}
            onBlur={() => firstname.onBlur()}
            onChange={(e) => handleChange(e, firstname.onChange)}
            error={Boolean(firstname.isDirty && !firstname.inputValid)}
            helperText={getError(firstname)}
          />

          <TextField
            className="signup__form-input"
            id="secondname"
            type="secondname"
            name="secondname"
            autoComplete="off"
            label="Фамилия"
            value={secondname.value}
            onBlur={() => secondname.onBlur()}
            onChange={(e) => handleChange(e, secondname.onChange)}
            error={Boolean(secondname.isDirty && !secondname.inputValid)}
            helperText={getError(secondname)}
          />

          <TextField
            className="signup__form-input"
            id="email"
            type="email"
            name="email"
            autoComplete="off"
            label="E-mail"
            value={email.value}
            onBlur={() => email.onBlur()}
            onChange={(e) => handleChange(e, email.onChange)}
            error={Boolean(email.isDirty && !email.inputValid)}
            helperText={getError(email)}
          />

          <FormControl
            variant="outlined"
            error={Boolean(password.isDirty && !password.inputValid)}
          >
            <InputLabel htmlFor="password" className="signup__label-password">
              Пароль
            </InputLabel>
            <OutlinedInput
              id="password"
              label="Пароль"
              value={password.value}
              onBlur={() => password.onBlur()}
              onChange={(e) => handleChange(e, password.onChange)}
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText
              error={Boolean(password.isDirty && !password.inputValid)}
            >
              {getError(password)}
            </FormHelperText>
          </FormControl>

          <FormControl
            variant="outlined"
            error={
              Boolean(passwordrepeat.isDirty && !passwordrepeat.inputValid) ||
              password.value !== passwordrepeat.value
            }
          >
            <InputLabel
              htmlFor="passwordrepeat"
              className="signup__label-password"
            >
              Подтвердите пароль
            </InputLabel>
            <OutlinedInput
              id="passwordrepeat"
              label="Подтвердите пароль"
              value={passwordrepeat.value}
              onBlur={() => passwordrepeat.onBlur()}
              onChange={(e) => handleChange(e, passwordrepeat.onChange)}
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>
              {getError(passwordrepeat) ||
                (password.value !== passwordrepeat.value &&
                  "Пароли не совпадают")}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="signup__wrapper signup__wrapper_type_bottom">
          {error && (
            <span className="signup__error signup__error_type_bottom">
              {error}
            </span>
          )}
          <Button
            variant="filled"
            size="medium"
            disabled={
              !email.inputValid ||
              !password.inputValid ||
              !firstname.inputValid ||
              !secondname.inputValid ||
              !passwordrepeat.inputValid ||
              password.value !== passwordrepeat.value ||
              Boolean(error)
            }
            type="submit"
            sx={{ backgroundColor: "red" }}
            className="signup__button"
          >
            Зарегистрироваться
          </Button>
          <p className="signup__question">
            Уже зарегистрированы?{" "}
            <Button variant="text" size="small">
              Войти
            </Button>
          </p>
        </div>
      </form>
    </StyledEngineProvider>
  );
};

export default SignUpPage;
