import { Box, StyledEngineProvider, Typography } from "@mui/material";
import classes from "./Settings.module.scss";
import { MyButton, MyInput } from "@/shared/UI";
import useInput from "@/hooks/useInput";
import { useState } from "react";
import { userService } from "@/api";

const Settings: React.FC = () => {
  const [error] = useState("");

  const password = useInput("", {
    isEmpty: true,
    minLength: 8,
    maxLength: 32,
  });

  const newPassword = useInput("", {
    isEmpty: true,
    minLength: 8,
    maxLength: 32,
  });

  const confirmPassword = useInput("", {
    isEmpty: true,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      current_password: password.value,
      new_password: newPassword.value,
      re_new_password: confirmPassword.value,
    };
    await userService.setNewPassword(data);
  }

  return (
    <StyledEngineProvider injectFirst>
      <form className={classes.settings} onSubmit={handleSubmit}>
        <Box className={classes.settings__section}>
          <Typography className={classes.settings__section_title}>
            Смена пароля
          </Typography>
          <div className={classes.settings__section_wrapper}>
            <MyInput
              data={password}
              variant="password"
              label="Текущий пароль"
            />
            <MyInput
              data={{
                ...newPassword,
                error:
                  password.value === newPassword.value
                    ? "Новый пароль не должен совпадать со старым"
                    : newPassword.error,
              }}
              variant="password"
              label="Новый пароль"
            />
            <MyInput
              data={{
                ...confirmPassword,
                error:
                  confirmPassword.value !== newPassword.value
                    ? "Пароли не совпадают"
                    : confirmPassword.error,
              }}
              variant="password"
              label="Новый пароль еще раз"
            />
          </div>
        </Box>

        <Box textAlign={"center"}>
          <MyButton
            className={classes.settings__btn}
            type="submit"
            disabled={
              !!password.error ||
              !!confirmPassword.error ||
              confirmPassword.value !== newPassword.value ||
              password.value === newPassword.value ||
              Boolean(error)
            }
          >
            Сохранить
          </MyButton>
        </Box>
      </form>
    </StyledEngineProvider>
  );
};

export default Settings;
