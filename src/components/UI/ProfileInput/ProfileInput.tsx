import {
  Box,
  FormControl,
  StyledEngineProvider,
  Typography,
} from "@mui/material";
import "./ProfileInput.scss";
import MyInput from "../MyInput/MyInput";
import MyDropDown, {
  TOnChangeMylty,
  TOnChangeSingle,
} from "../MyDropDown/MyDropDown";
import ButtonUploadImg from "@/features/dashboard/components/buttonUploadImg/ButtonUploadImg";
import { useState } from "react";
import { IProfileInputProps } from "@/features/dashboard/model/types";
import MyButton from "../MyButton/MyButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

//TODO Исправить description у добавления фото

const ProfileInput: React.FC<IProfileInputProps> = ({
  heading,
  variant = "input",
  placeholder = "",
  label = "",
  description = "",
  options = [],
  minRows,
  value,
  onChange,
  data,
  disabled,
  handleDeleteCaseImage,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [caseImages, setCaseImages] = useState<string[]>([]);

  function handleWrapperUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file && onChange) {
      const fileUrl = URL.createObjectURL(file);
      onChange(event, file as string & string[] & File);
      setImage(fileUrl);
    }
  }

  function handleCaseImagesUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

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
            />
          </FormControl>
        </StyledEngineProvider>
      );

    case "drop-down":
      return (
        <StyledEngineProvider injectFirst>
          <FormControl className="profileInputForm">
            <Typography className="profileInputLabel">{heading}</Typography>
            <MyDropDown
              className="profileDropdown"
              options={options}
              value={value as string | null}
              onChange={onChange as TOnChangeSingle}
              placeholder={placeholder}
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
              <ButtonUploadImg
                className="profileWrapperButton"
                label={image ? "Загрузить новую обложку" : label}
                handleFileChange={handleWrapperUpload}
                description={description}
              />
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
              {caseImages.map((item, i) => {
                return (
                  <Box key={item}>
                    <img
                      className="profileCaseImage"
                      src={item}
                      alt={`Обложка кейса №${i}`}
                    />
                    <MyButton
                      onClick={() => handeDeleteCaseImage(i)}
                      label="Удалить"
                      variant="text"
                      color="error"
                      startIcon={<DeleteForeverIcon />}
                    />
                  </Box>
                );
              })}
              <ButtonUploadImg
                className="profileWrapperButton"
                label={label}
                handleFileChange={handleCaseImagesUpload}
                description={description}
                disabled={disabled}
              />
            </Box>
          </FormControl>
        </StyledEngineProvider>
      );

    case "tags":
      return (
        <StyledEngineProvider injectFirst>
          <FormControl className="profileInputForm">
            <Typography className="profileInputLabel">{heading}</Typography>
            <MyDropDown
              options={options}
              value={value as string[]}
              onChange={onChange as TOnChangeMylty}
              className="profileInputTags"
              variant="multiple"
              placeholder={placeholder}
            />
          </FormControl>
        </StyledEngineProvider>
      );
  }
};

export default ProfileInput;
