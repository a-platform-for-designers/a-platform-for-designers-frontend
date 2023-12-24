import { useEffect, useState } from "react";
import { Avatar, Box } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import classes from "./AvatarUpload.module.scss";
import ButtonUploadImg from "../buttonUploadImg/ButtonUploadImg";
import { enqueueSnackbar } from "notistack";
import { useAppSelector } from "@/hooks/reduxHooks";

interface IAvatarUploadProps {
  cbFileChange: (file: File | null) => void;
}

const AvatarUpload: React.FC<IAvatarUploadProps> = ({ cbFileChange }) => {
  const { user } = useAppSelector((state) => state.user);

  const [avatar, setAvatar] = useState<string | undefined>(user?.photo);

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
      <Avatar
        className={classes.avatar_upload__image}
        alt="avatar"
        src={avatar}
      >{`${user?.first_name[0]}${user?.last_name[0]}`}</Avatar>

      <ButtonUploadImg
        label="Загрузить фото"
        startIcon={<AddAPhotoIcon />}
        handleFileChange={handleFileChange}
        description={`Рекомендуемый размер\n 212x212 px`}
      />
    </Box>
  );
};

export default AvatarUpload;
