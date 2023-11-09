import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInputProps,
  StyledEngineProvider,
  TextField,
} from "@mui/material";
import "./MyInput.scss";
import { objFromUseInput } from "../../../hooks/useInput";
import { useState } from "react";
import eye from "../../../assets/icons/eye.svg";
import eyeClosed from "../../../assets/icons/eye-close.svg";

type TInputTextArea = HTMLInputElement | HTMLTextAreaElement;

export interface IMyInputProps {
  data: objFromUseInput;
  label?: string;
  onChangeCallback?: () => void;
  variant?:
    | "text"
    | "password"
    | "text-label-without"
    | "textarea-label-without";
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  minRows?: string | number | undefined;
}

const MyInput: React.FC<IMyInputProps> = ({
  data,
  onChangeCallback,
  variant = "text",
  label,
  placeholder = "",
  disabled = false,
  className,
  minRows,
}) => {
  const invalid = Boolean(data.isDirty && data.error);
  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword((prev) => !prev);
  }

  function getError(data: objFromUseInput) {
    return data.isDirty && data.error;
  }

  function handleChange(
    event: React.ChangeEvent<TInputTextArea>,
    callback: (event: React.ChangeEvent<TInputTextArea>) => void
  ) {
    if (onChangeCallback) {
      onChangeCallback();
    }
    callback(event);
  }

  switch (variant) {
    case "text":
      return (
        <StyledEngineProvider injectFirst>
          <TextField
            className={`myInput__container ${className} ${
              invalid ? "myInput__container_type_incorrect" : ""
            }`}
            type="text"
            label={label}
            variant="filled"
            value={data.value}
            onBlur={() => data.onBlur()}
            onChange={(e) => handleChange(e, data.onChange)}
            error={invalid}
            helperText={getError(data)}
            placeholder={placeholder}
            disabled={disabled}
            InputProps={
              { disableUnderline: true } as Partial<OutlinedInputProps>
            }
          />
        </StyledEngineProvider>
      );
    case "password":
      return (
        <StyledEngineProvider injectFirst>
          <FormControl
            className={`myInput__container  ${
              invalid ? "myInput__container_type_incorrect" : ""
            }`}
            variant="filled"
            error={invalid}
          >
            <InputLabel className="myInput__label-password">{label}</InputLabel>
            <FilledInput
              className={`${className} myInput__input`}
              value={data.value}
              disableUnderline
              disabled={disabled}
              onBlur={() => data.onBlur()}
              onChange={(e) => handleChange(e, data.onChange)}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <img src={eyeClosed} /> : <img src={eye} />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={invalid}>{getError(data)}</FormHelperText>
          </FormControl>
        </StyledEngineProvider>
      );
    case "text-label-without":
      return (
        <StyledEngineProvider injectFirst>
          <FormControl
            className={`myInput__container  ${
              invalid ? "myInput__container_type_incorrect" : ""
            }`}
            variant="filled"
            error={invalid}
          >
            <FilledInput
              className={`${className} myInput__input myInput__input-type-label-without`}
              value={data.value}
              disableUnderline
              disabled={disabled}
              onBlur={() => data.onBlur()}
              onChange={(e) => handleChange(e, data.onChange)}
              type="text"
              placeholder={placeholder}
            />
            <FormHelperText error={invalid}>{getError(data)}</FormHelperText>
          </FormControl>
        </StyledEngineProvider>
      );

    case "textarea-label-without":
      return (
        <StyledEngineProvider injectFirst>
          <FormControl
            className={`myInput__container myInput__container_type_multy  ${
              invalid ? "myInput__container_type_incorrect" : ""
            }`}
            variant="filled"
            error={invalid}
          >
            <FilledInput
              multiline
              className={`${className} myInput__input myInput__input-type-label-without`}
              value={data.value}
              disableUnderline
              disabled={disabled}
              onBlur={() => data.onBlur()}
              onChange={(e) => handleChange(e, data.onChange)}
              type="text"
              placeholder={placeholder}
              minRows={minRows}
            />
            <FormHelperText error={invalid}>{getError(data)}</FormHelperText>
          </FormControl>
        </StyledEngineProvider>
      );
  }
};

export default MyInput;
