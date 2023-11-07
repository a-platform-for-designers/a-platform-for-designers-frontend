import { Box, Button, Typography } from "@mui/material";
import classes from "./ButtonUploadImg.module.scss";
import { useRef } from "react";

interface IProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  startIcon?: React.ReactNode;
  label?: string;
  description?: string;
  className?: string;
}

const ButtonUploadImg: React.FC<IProps> = ({
  handleFileChange,
  startIcon,
  label,
  description,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  return (
    <Box className={`${classes.button__upload_wrapper} ${className}`}>
      <input
        accept="image/*"
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button
        component="span"
        startIcon={startIcon}
        onClick={handleUploadClick}
        variant="outlined"
      >
        {label}
      </Button>
      <Typography className={classes.button__upload_subtitle}>
        {description}
      </Typography>
    </Box>
  );
};

export default ButtonUploadImg;
