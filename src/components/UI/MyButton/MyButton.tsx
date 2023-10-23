import Button from "@mui/material-next/Button";
import "./MyButton.scss";
import { StyledEngineProvider } from "@mui/material";

interface IMyButtonProps {
  label: string;
  variant?: "text" | "filled";
  onClick: () => void;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button";
}

const MyButton: React.FC<IMyButtonProps> = ({
  label,
  variant = "filled",
  onClick,
  size = "medium",
  disabled = false,
  className,
  type = "button",
}) => {
  return (
    <StyledEngineProvider injectFirst>
      <Button
        variant={variant}
        size={size}
        onClick={() => onClick()}
        disabled={disabled}
        className={`myButton ${className}`}
        type={type}
      >
        {label}
      </Button>
    </StyledEngineProvider>
  );
};

export default MyButton;
