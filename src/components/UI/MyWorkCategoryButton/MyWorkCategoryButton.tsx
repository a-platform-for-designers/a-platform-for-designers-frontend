import Button from "@mui/material-next/Button";
import "./MyWorkCategoryButton.scss";
import { StyledEngineProvider } from "@mui/material";
import React from "react";

interface IMyWorkCategoryButtonProps {
  label: string;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  active?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const MyWorkCategoryButton: React.FC<IMyWorkCategoryButtonProps> = ({
  label,
  onClick,
  disabled = false,
  active = false,
  fullWidth = false,
  className,
}) => {
  return (
    <StyledEngineProvider injectFirst>
      <Button
        fullWidth={fullWidth}
        onClick={onClick}
        disabled={disabled}
        className={`myWorkCategoryButton ${className} ${
          active ? "myWorkCategoryButton_active" : ""
        }`}
        type={"button"}
        sx={{ width: () => `${fullWidth ? "100%;" : "auto"}` }}
      >
        {label}
      </Button>
    </StyledEngineProvider>
  );
};

export default MyWorkCategoryButton;
