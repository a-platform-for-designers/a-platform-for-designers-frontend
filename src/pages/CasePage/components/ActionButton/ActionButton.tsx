import {
  Grid,
  SvgIcon,
  StyledEngineProvider,
  Typography,
  SxProps,
  Theme,
  Button,
} from "@mui/material";
import "./ActionButton.scss";
import React from "react";

const actionButton: SxProps<Theme> = {
  minWidth: "auto",
  minHeight: "auto",
  color: (theme) => theme.palette.text.primary,
  "&:hover": {
    color: (theme) => theme.palette.primary.main,
    svg: {
      stroke: (theme) => theme.palette.primary.main,
    },
  },
  svg: {
    width: "28px",
    height: "28px",
    strokeWidth: "2px",
    stroke: (theme) => theme.palette.text.primary,
    fill: (theme) => theme.palette.primary.contrastText,
  },
};

const actionActiveButton: SxProps<Theme> = {
  "&:hover": {
    svg: {
      stroke: (theme) => theme.palette.primary.main,
      fill: (theme) => theme.palette.primary.main,
    },
  },
  svg: {
    width: "28px",
    height: "28px",
    stroke: (theme) => theme.palette.text.primary,
    fill: (theme) => theme.palette.text.primary,
  },
};

interface IActionButtonProps {
  variant?: "like" | "favorite";
  active?: boolean;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
}

const ActionButton: React.FC<IActionButtonProps> = ({
  variant = "like",
  active = false,
  onClick,
  disabled,
}) => {
  let image: JSX.Element;
  let text: string;

  switch (variant) {
    case "like":
      image = (
        <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21L10.55 19.7C8.86667 18.1834 7.475 16.875 6.375 15.775C5.275 14.675 4.4 13.6875 3.75 12.8125C3.1 11.9375 2.64583 11.1334 2.3875 10.4C2.12917 9.66669 2 8.91669 2 8.15002C2 6.58336 2.525 5.27502 3.575 4.22502C4.625 3.17502 5.93333 2.65002 7.5 2.65002C8.36667 2.65002 9.19167 2.83336 9.975 3.20002C10.7583 3.56669 11.4333 4.08336 12 4.75002C12.5667 4.08336 13.2417 3.56669 14.025 3.20002C14.8083 2.83336 15.6333 2.65002 16.5 2.65002C18.0667 2.65002 19.375 3.17502 20.425 4.22502C21.475 5.27502 22 6.58336 22 8.15002C22 8.91669 21.8708 9.66669 21.6125 10.4C21.3542 11.1334 20.9 11.9375 20.25 12.8125C19.6 13.6875 18.725 14.675 17.625 15.775C16.525 16.875 15.1333 18.1834 13.45 19.7L12 21Z" />
        </SvgIcon>
      );
      text = "Нравится";
      break;
    case "favorite":
      image = (
        <SvgIcon viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.666 4H9.33268C7.86602 4 6.66602 5.2 6.66602 6.66667V28L15.9993 24L25.3327 28V6.66667C25.3327 5.2 24.1327 4 22.666 4Z" />
        </SvgIcon>
      );
      text = "Сохранить";
      break;
  }

  return (
    <StyledEngineProvider injectFirst>
      <Grid
        className="actionButton"
        container
        gap="10px"
        wrap="nowrap"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        component={Button}
        sx={{ ...actionButton, ...(active ? actionActiveButton : {}) }}
        onClick={onClick}
        disableRipple
        disabled={disabled}
      >
        {image}
        <Typography className="actionButton__text" sx={{ color: "inherit" }}>
          {text}
        </Typography>
      </Grid>
    </StyledEngineProvider>
  );
};

export default ActionButton;
