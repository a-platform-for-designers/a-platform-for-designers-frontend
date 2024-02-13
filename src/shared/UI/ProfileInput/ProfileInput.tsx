import {
  Box,
  FormControl,
  StyledEngineProvider,
  Typography,
  FormHelperText,
} from "@mui/material";
import "./ProfileInput.scss";
import MyInput from "../MyInput/MyInput";
import MySingleDropDown, {
  TOnChangeSingle,
} from "../MySingleDropDown/MySingleDropDown";
import MyMultipleDropDown, {
  TOnChangeMylty,
} from "../MyMultipleDropDown/MyMultipleDropDown";
import ButtonUploadImg from "@/pages/DashboardPage/components/buttonUploadImg/ButtonUploadImg";
import { IProfileInputProps } from "@/pages/DashboardPage/model/types";
import { useEffect, useState } from "react";
import MyButton from "../MyButton/MyButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { enqueueSnackbar } from "notistack";

//TODO Исправить description у добавления фото

const ProfileInput: React.FC<IProfileInputProps> = ({
  heading,
  error,
  setDisableButton,
  variant = "input",
  placeholder = "",
  label = "",
  description = "",
  options = [],
  minRows,
  value,
  onChange,
  data,
  //disabled,
  handleDeleteCaseImage,
  maxLength,
  className,
  avatar,
  images,
  notRequired,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [caseImages, setCaseImages] = useState<string[]>([]);
  const [noImageError, setNoImageError] = useState<boolean>();
  const [noWrapperError, setNoWrapperError] = useState<boolean>();
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [imagesFromServer, setImagesFromServer] = useState<
    string[] | undefined
  >([]);

  useEffect(() => {
    if (images) {
      setImagesFromServer(images);
    }
  }, [images]);

  useEffect(() => {
    if (!isFirstLoad) {
      if (caseImages.length <= 0) {
        setNoImageError(true);
      } else {
        setNoImageError(false);
      }
      if (!image) {
        setNoWrapperError(true);
      } else {
        setNoWrapperError(false);
      }
    }
  }, [caseImages, image, isFirstLoad]);

  function validateImage(file: File): string | void {
    const filetype = "image/jpeg, image/jpg, image/tiff, image/tif, image/png";

    if (!filetype.includes(file?.type)) {
      return "Неверный загружаемый формат";
    }
    if (file?.size >= 5242880) {
      return "Слишком большой размер файла";
    }
  }

  function handleWrapperUpload(event: React.ChangeEvent<HTMLInputElement>) {
    setIsFirstLoad(false);
    const file = event.target.files?.[0];
    if (!file) return;
    const validateError = validateImage(file);
    if (validateError) {
      enqueueSnackbar(validateError, { variant: "error" });
      return;
    }

    if (file && onChange) {
      const fileUrl = URL.createObjectURL(file);
      onChange(event, file as string & string[] & File);
      setImage(fileUrl);
      setIsFirstLoad(false);
      return;
    }
  }

  function handleCaseImagesUpload(event: React.ChangeEvent<HTMLInputElement>) {
    setIsFirstLoad(false);
    const file = event.target.files?.[0];
    if (!file) return;
    const validateError = validateImage(file);
    if (validateError) {
      enqueueSnackbar(validateError, { variant: "error" });
      return;
    }

    if (file && onChange) {
      const fileUrl = URL.createObjectURL(file);
      onChange(event, file as string & string[] & File);
      setCaseImages((prev) => {
        return [...prev, fileUrl];
      });
    }
  }

  function handeDeleteCaseImage(i: number) {
    if (handleDeleteCaseImage) {
      setCaseImages((prev) => prev.filter((_, index) => index !== i));
      handleDeleteCaseImage(i);
    }
  }

  function handeDeleteCaseImages(i: number) {
    if (handeDeleteCaseImages && imagesFromServer) {
      setImagesFromServer((prev) => prev?.filter((_, index) => index !== i));
      handeDeleteCaseImages(i);
    }
  }

  switch (variant) {
    case "input":
      return (
        <StyledEngineProvider injectFirst>
          <FormControl className="profileInputForm">
            <Typography className="profileInputLabel">{heading}</Typography>
            <MyInput
              variant="textarea-label-without"
              data={data!}
              className="profileInput"
              minRows={minRows}
              maxLength={maxLength}
              placeholder={placeholder}
              setDisableButton={setDisableButton}
            />
          </FormControl>
        </StyledEngineProvider>
      );

    case "text-label-without":
      return (
        <StyledEngineProvider injectFirst>
          <FormControl className="profileInputForm">
            <Typography className="profileInputLabel">{heading}</Typography>
            <MyInput
              variant="text-label-without"
              data={data!}
              className={`profileInput ${className}`}
              placeholder={placeholder}
              setDisableButton={setDisableButton}
            />
          </FormControl>
        </StyledEngineProvider>
      );

    case "drop-down":
      return (
        <StyledEngineProvider injectFirst>
          <FormControl className="profileInputForm">
            <Typography className="profileInputLabel">{heading}</Typography>
            <MySingleDropDown
              className="profileDropdown"
              options={options}
              value={value as string | null}
              onChange={onChange as TOnChangeSingle}
              placeholder={placeholder}
              error={error}
              notRequired={notRequired}
            />
          </FormControl>
        </StyledEngineProvider>
      );

    case "wrapper-photo-upload":
      return (
        <StyledEngineProvider injectFirst>
          <FormControl className="profileInputForm">
            <Typography className="profileInputLabel">{heading}</Typography>
            <Box>
              {image && (
                <img
                  className="profileWrapperImage"
                  src={image}
                  alt="Обложка кейса"
                />
              )}
              {!image && avatar && (
                <img
                  className="profileWrapperImage"
                  src={avatar}
                  alt="Обложка кейса5"
                />
              )}
              <ButtonUploadImg
                className="profileWrapperButton"
                label={image ? "Загрузить новую обложку" : label}
                handleFileChange={handleWrapperUpload}
                description={description}
              />
              <FormHelperText
                className="profileInputForm__error"
                error={noWrapperError}
              >
                {noWrapperError ? "Необходимо добавить обложку" : ""}
              </FormHelperText>
            </Box>
          </FormControl>
        </StyledEngineProvider>
      );

    case "case-photo-upload":
      return (
        <StyledEngineProvider injectFirst>
          <FormControl className="profileInputForm">
            <Typography className="profileInputLabel">{heading}</Typography>
            <Box>
              <Typography className="profileImageHeading">
                Загрузите от 1 до 4 изображений
              </Typography>
              {caseImages &&
                caseImages.map((item, i) => {
                  return (
                    <Box
                      key={item}
                      className="profileInput__case_image_wrapper"
                    >
                      <img
                        className="profileCaseImage"
                        src={item}
                        alt={`Обложка кейса №${i}`}
                      />
                      <MyButton
                        onClick={() => handeDeleteCaseImage(i)}
                        variant="text"
                        color="error"
                        startIcon={<DeleteForeverIcon />}
                        className="profileInput__btn profileInput__btn_type_del"
                      >
                        Удалить
                      </MyButton>
                    </Box>
                  );
                })}
              {imagesFromServer &&
                imagesFromServer.map((item, i) => {
                  return (
                    <Box
                      key={item}
                      className="profileInput__case_image_wrapper"
                    >
                      <img
                        className="profileCaseImage"
                        src={item}
                        alt={`Обложка кейса №${i}`}
                      />
                      <MyButton
                        onClick={() => handeDeleteCaseImages(i)}
                        variant="text"
                        color="error"
                        startIcon={<DeleteForeverIcon />}
                        className="profileInput__btn profileInput__btn_type_del"
                      >
                        Удалить
                      </MyButton>
                    </Box>
                  );
                })}
              <ButtonUploadImg
                className="profileWrapperButton"
                label={label}
                handleFileChange={handleCaseImagesUpload}
                description={description}
                disabled={caseImages.length >= 4}
              />
              <FormHelperText
                className="profileInputForm__error"
                error={noImageError || caseImages.length >= 4}
              >
                {noImageError
                  ? "Добавьте хотя бы одно изображение"
                  : caseImages.length >= 4
                  ? "Превышен лимит загруженных файлов"
                  : ""}
              </FormHelperText>
            </Box>
          </FormControl>
        </StyledEngineProvider>
      );

    case "tags":
      return (
        <StyledEngineProvider injectFirst>
          <FormControl className="profileInputForm">
            <Typography className="profileInputLabel">{heading}</Typography>
            <MyMultipleDropDown
              options={options}
              value={value as string[]}
              onChange={onChange as TOnChangeMylty}
              className="profileInputTags"
              placeholder={placeholder}
            />
          </FormControl>
        </StyledEngineProvider>
      );
  }
};

export default ProfileInput;
