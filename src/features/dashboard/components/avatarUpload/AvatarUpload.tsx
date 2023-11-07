import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import classes from "./AvatarUpload.module.scss";

const AvatarUpload = () => {
  const [avatar, setAvatar] = useState<string>(
    "https://uhd.name/uploads/posts/2022-08/1660089967_24-uhd-name-p-shakira-bez-makiyazha-devushka-krasivo-fot-49.jpg"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setAvatar(fileUrl);
      setSelectedFile(file);
      selectedFile; //TODO убрать - после соединения с беком, это чтобы не давало ошибку
    }
  };

  useEffect(() => {
    return () => {
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  return (
    <Box display={"flex"} className={classes.avatar_upload__image_wrapper}>
      <img
        className={classes.avatar_upload__image}
        src={avatar}
        onClick={handleUploadClick}
      />
      <Box className={classes.avatar_upload__upload_wrapper}>
        <input
          accept="image/*"
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Button
          component="span"
          startIcon={<AddAPhotoIcon />}
          onClick={handleUploadClick}
          variant="outlined"
        >
          Загрузить фото
        </Button>
        <Typography className={classes.avatar_upload__upload_subtitle}>
          Рекомендуемый размер 212x212 px
        </Typography>
      </Box>
    </Box>
  );
};

export default AvatarUpload;
