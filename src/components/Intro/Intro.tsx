import { Container, StyledEngineProvider, Typography } from "@mui/material";
import "./Intro.scss";
import MyButton from "../UI/MyButton/MyButton";
import React from "react";

const Intro: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Container className="intro" component="section">
        <Typography className="intro__title" component="h1">
          <Typography
            className="intro__title-accent intro__title-accent_type_bold"
            component="span"
          >
            DesignCollab —
          </Typography>{" "}
          это платформа для&nbsp;
          <Typography
            className="intro__title-accent intro__title-accent_type_bold intro__title-accent_type_italic"
            component="span"
          >
            дизайнеров{" "}
          </Typography>{" "}
          и{" "}
          <Typography
            className="intro__title-accent intro__title-accent_type_bold intro__title-accent_type_italic"
            component="span"
          >
            заказчиков
          </Typography>
          . Находите дизайнеров, заказы и&nbsp;
          <Typography
            className="intro__title-accent intro__title-accent_type_bold intro__title-accent_type_italic"
            component="span"
          >
            вдохновение
          </Typography>{" "}
          в одном месте
        </Typography>
        <MyButton
          label="Найти дизайнеров"
          size="small"
          onClick={() => {
            console.log("Do something");
          }}
        />
      </Container>
    </StyledEngineProvider>
  );
};

export default Intro;
