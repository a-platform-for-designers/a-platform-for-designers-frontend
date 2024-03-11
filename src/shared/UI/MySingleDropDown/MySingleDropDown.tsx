import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import "./MySingleDropDown.scss";
import { StyledEngineProvider } from "@mui/material/styles";
import { FormHelperText, FormControl } from "@mui/material";
import { useState } from "react";

type TValueSingle = string | null;
export type TOnChangeSingle = (
  event: React.SyntheticEvent<Element, Event>,
  newValue: TValueSingle
) => void;

export type TSingleDropDown = {
  value: TValueSingle;
  onChange: TOnChangeSingle;
  size?: "medium" | "fullWidth";
};

type TMySingleDropDownProps = TSingleDropDown & {
  options: string[];
  className?: string;
  placeholder?: string;
  error?: boolean;
  notRequired?: boolean;
};

const MySingleDropDown: React.FC<TMySingleDropDownProps> = ({
  options,
  value = "",
  onChange,
  size = "fullWidth",
  className,
  placeholder,
  notRequired,
}) => {
  const checkedIcon = <CheckOutlinedIcon fontSize="small" color="action" />;
  // hardcoded for a while, soon it will be changed
  const sizeSelector =
    size === "medium"
      ? "myMultipleDropDown__size_medium"
      : "myMultipleDropDown__size_full-width";

  const [isError, setIsError] = useState(false);

  function handleValue() {
    if (!value && !notRequired) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }

  return (
    <StyledEngineProvider injectFirst>
      <Autocomplete
        value={value as TValueSingle}
        onChange={onChange as TOnChangeSingle}
        onBlur={handleValue}
        className={`mySingleDropDown ${className} ${sizeSelector}`}
        options={options}
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
          <li {...props} className="mySingleDropDown__element">
            {option}
            <Checkbox
              icon={<></>}
              checkedIcon={checkedIcon}
              className="mySingleDropDown__checkbox"
              checked={selected}
            />
          </li>
        )}
        renderInput={(params) => (
          <FormControl
            className={`myInput__container mySingleDropDown__container  ${
              isError ? "myInput__container_type_incorrect" : ""
            }`}
            variant="filled"
            error={isError}
          >
            <TextField
              {...params}
              variant="filled"
              placeholder={placeholder}
              className={`mySingleDropDown__input ${
                isError ? "myInput__container_type_incorrect" : ""
              }`}
            ></TextField>
            <FormHelperText error={isError}>
              {isError ? "Поле обязательно для заполнения" : ""}
            </FormHelperText>
          </FormControl>
        )}
      />
    </StyledEngineProvider>
  );
};

export default MySingleDropDown;
