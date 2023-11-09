import Button from "@mui/material/Button";
import "./MyButton.scss";
import { StyledEngineProvider, SxProps, Theme } from "@mui/material";

interface IMyButtonProps {
  label: string;
  variant?: "text" | "contained" | "outlined" | "tag";
  onClick?: React.MouseEventHandler;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "error";
  disabled?: boolean;
  active?: boolean;
  inverted?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button";
  startIcon?: React.ReactNode;
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

const MyButton: React.FC<IMyButtonProps> = ({
  label,
  variant = "contained",
  onClick,
  color = "primary",
  size = "medium",
  disabled = false,
  inverted = false, // пока только с варинтом contained
  active = false, // пока только с варинтом tag
  className,
  type = "button",
  startIcon,
}) => {
  return (
    <StyledEngineProvider injectFirst>
      <Button
        variant={variant}
        size={size}
        color={color}
        onClick={onClick}
        disabled={disabled}
        className={`myButton ${className}`}
        startIcon={startIcon}
        sx={{
          ...(variant === "contained" &&
            inverted &&
            myButtonPrimaryContainedInvertedTheme),
          ...(variant === "tag" && active && myButtonPrimaryTagActiveTheme),
        }}
        type={type}
        disableRipple
      >
        {label}
      </Button>
    </StyledEngineProvider>
  );
};

export default MyButton;
