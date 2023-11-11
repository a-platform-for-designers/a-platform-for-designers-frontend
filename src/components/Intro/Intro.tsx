import {
  Box,
  StyledEngineProvider,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import "./Intro.scss";
import MyButton from "../UI/MyButton/MyButton";
import React from "react";
import { useNavigate } from "react-router-dom";

const titleStyles: SxProps<Theme> = {
  color: (theme) => theme.palette.primary.contrastText,
};

const Intro: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledEngineProvider injectFirst>
      <Box className="intro">
        <Typography className="intro__title" component="h1" sx={titleStyles}>
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
          size="medium"
          inverted
          onClick={() => {
            navigate("/designers");
          }}
        />
      </Box>
    </StyledEngineProvider>
  );
};

export default Intro;
