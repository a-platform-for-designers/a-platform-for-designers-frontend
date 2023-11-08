import {
  Box,
  FormControl,
  StyledEngineProvider,
  Typography,
} from "@mui/material";
import "./ProfileInput.scss";
import MyInput from "../MyInput/MyInput";
import useInput from "@/hooks/useInput";
import MyDropDown from "../MyDropDown/MyDropDown";
import { SyntheticEvent, useState } from "react";
import ButtonUploadImg from "@/features/dashboard/components/buttonUploadImg/buttonUploadImg";

export interface IProfileInputProps {
  heading?: string;
  variant?:
    | "input"
    | "drop-down"
    | "wrapper-photo-upload"
    | "case-photo-upload"
    | "tags";
  placeholder?: string;
  className?: string;
  label?: string;
  description?: string;
  options?: string[];
}

//TODO Исправить description у добавления фото

const ProfileInput: React.FC<IProfileInputProps> = ({
  heading,
  variant = "input",
  placeholder = "",
  label = "",
  description = "",
  options = [""],
}) => {
  const [directions, setDirections] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  selectedFile;
  const [image, setImage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImage(fileUrl);
      setSelectedFile(file);
    }
  };

  function handleSetDirections(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    setDirections(newValue);
  }

  function handleSetTools(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    setTools(newValue);
  }

  const text = useInput(
    "",
    {
      isEmpty: true,
      minLength: 2,
      maxLength: 40,
      isName: true,
    },
    { trim: true }
  );

  switch (variant) {
    case "input":
      return (
        <StyledEngineProvider injectFirst>
          <FormControl className="profileInputForm">
            <Typography className="profileInputLabel">{heading}</Typography>
            <MyInput
              className="profileInput"
              variant="textarea-label-without"
              data={text}
              label=""
              placeholder={placeholder}
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
              value={directions}
              onChange={handleSetDirections}
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
              {image !== "" && (
                <img
                  className="profileWrapperImage"
                  src={image}
                  alt="Обложка кейса"
                />
              )}
              <ButtonUploadImg
                className="profileWrapperButton"
                label={label}
                handleFileChange={handleFileChange}
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
              {image !== "" && (
                <img
                  className="profileCaseImage"
                  src={image}
                  alt="Обложка кейса"
                />
              )}
              <ButtonUploadImg
                className="profileWrapperButton"
                label={label}
                handleFileChange={handleFileChange}
                description={description}
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
              value={tools}
              onChange={handleSetTools}
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
