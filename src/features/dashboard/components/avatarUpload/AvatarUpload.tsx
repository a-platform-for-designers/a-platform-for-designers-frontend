import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import classes from "./AvatarUpload.module.scss";
import ButtonUploadImg from "../buttonUploadImg/buttonUploadImg";

const AvatarUpload = () => {
  const [avatar, setAvatar] = useState<string>(
    "https://uhd.name/uploads/posts/2022-08/1660089967_24-uhd-name-p-shakira-bez-makiyazha-devushka-krasivo-fot-49.jpg"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  selectedFile;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setAvatar(fileUrl);
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    return () => {
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  return (
    <Box display={"flex"} className={classes.avatar_upload__image_wrapper}>
      <img className={classes.avatar_upload__image} src={avatar} />

      <ButtonUploadImg
        label="Загрузить фото"
        startIcon={<AddAPhotoIcon />}
        handleFileChange={handleFileChange}
        description="Рекомендуемый размер 212x212 px"
      />
    </Box>
  );
};

export default AvatarUpload;
