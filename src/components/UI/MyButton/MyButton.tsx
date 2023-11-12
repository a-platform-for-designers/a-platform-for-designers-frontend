import Button from "@mui/material/Button";
import "./MyButton.scss";
import { StyledEngineProvider, SxProps, Theme } from "@mui/material";
import { PropsWithChildren } from "react";

export interface IMyButtonProps {
  variant?: "text" | "contained" | "outlined" | "tag";
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "error";
  fullWidth?: boolean;
  disabled?: boolean;
  disableElevation?: boolean;
  disableRipple?: boolean;
  active?: boolean;
  inverted?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
  type?: "submit" | "reset" | "button";
  startIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

// Стили кнопки для contained prymary, поменяны местами фон и цвет текста
const myButtonPrimaryContainedInvertedTheme: SxProps<Theme> = {
  color: (theme) => theme.palette.primary.main,
  backgroundColor: (theme) => theme.palette.background.default,
  "&:hover": {
    backgroundColor: (theme) => theme.palette.grey[100],
  },
  "&:active": {
    backgroundColor: (theme) => theme.palette.grey[300],
    color: (theme) => theme.palette.primary.dark,
  },
};

// Стили для активного состояния варианта tag, т.к. пока не нашел этого в MUI
const myButtonPrimaryTagActiveTheme: SxProps<Theme> = {
  backgroundColor: (theme) => theme.palette.primary.main + "3d",
  "&:hover": {
    borderColor: "transparent",
    backgroundColor: (theme) => theme.palette.primary.main + "3d",
  },
};

const MyButton: React.FC<PropsWithChildren<IMyButtonProps>> = ({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  disabled = false,
  inverted = false, // пока только с варинтом contained
  active = false, // пока только с варинтом tag
  className,
  sx = {},
  type = "button",
  startIcon,
  disableElevation,
  disableRipple,
  fullWidth,
  onClick,
}) => {
  return (
    <StyledEngineProvider injectFirst>
      <Button
        variant={variant}
        size={size}
        color={color}
        fullWidth={fullWidth}
        onClick={onClick}
        disabled={disabled}
        className={`myButton ${className}`}
        startIcon={startIcon}
        disableElevation={disableElevation}
        disableRipple={disableRipple}
        sx={{
          ...(variant === "contained" &&
            inverted &&
            myButtonPrimaryContainedInvertedTheme),
          ...(variant === "tag" && active && myButtonPrimaryTagActiveTheme),
          ...sx,
        }}
        type={type}
      >
        {children}
      </Button>
    </StyledEngineProvider>
  );
};

export default MyButton;
