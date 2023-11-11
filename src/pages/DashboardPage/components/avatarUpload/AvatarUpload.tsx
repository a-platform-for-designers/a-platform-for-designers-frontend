import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import classes from "./AvatarUpload.module.scss";
import ButtonUploadImg from "../buttonUploadImg/ButtonUploadImg";
import { enqueueSnackbar } from "notistack";

interface IAvatarUploadProps {
  cbFileChange: (file: File | null) => void;
}

const AvatarUpload: React.FC<IAvatarUploadProps> = ({ cbFileChange }) => {
  const [avatar, setAvatar] = useState<string | undefined>(
    "https://uhd.name/uploads/posts/2022-08/1660089967_24-uhd-name-p-shakira-bez-makiyazha-devushka-krasivo-fot-49.jpg"
  );

  function validateImage(file: File): string | void {
    const filetype = "image/jpeg, image/jpg, image/tiff, image/tif, image/png";

    if (!filetype.includes(file?.type)) {
      return "Неверный загружаемый формат";
    }
    if (file?.size >= 5242880) {
      return "Слишком большой размер файла";
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const validateError = validateImage(file);
    if (validateError) {
      enqueueSnackbar(validateError, { variant: "error" });
      return;
    }

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setAvatar(fileUrl);
      cbFileChange(file);
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
