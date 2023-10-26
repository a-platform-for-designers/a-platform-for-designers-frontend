import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import "./MyDropDown.scss";
import { StyledEngineProvider } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import closeIcon from "../../../assets/icons/close.svg";
import { useState } from "react";

interface IMyDropDownProps {
  variant?: "multiple" | "single";
  options: string[];
}

const MyDropDown: React.FC<IMyDropDownProps> = ({
  variant = "single",
  options,
}) => {
  const checkedIcon = <CheckOutlinedIcon fontSize="small" color="action" />;
  const [valueSingle, setValueSingle] = useState<string | null>(null);
  const [valueMulty, setValueMulty] = useState<string[]>([]);

  switch (variant) {
    case "multiple":
      return (
        <StyledEngineProvider injectFirst>
          <Autocomplete
            value={valueMulty}
            onChange={(_: unknown, newValue: string[]) => {
              setValueMulty(newValue);
            }}
            multiple
            className="myDropDown"
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="filled"
                  label={option}
                  {...getTagProps({ index })}
                  deleteIcon={<img src={closeIcon} />}
                />
              ))
            }
            renderOption={(props, option, { selected }) => (
              <li {...props} className="myDropDown__element">
                {option}
                <Checkbox
                  icon={<></>}
                  checkedIcon={checkedIcon}
                  className="myDropDown__checkbox"
                  checked={selected}
                />
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                placeholder="Favorites"
                className="myDropDown__input"
              />
            )}
          />
        </StyledEngineProvider>
      );

    case "single":
      return (
        <StyledEngineProvider injectFirst>
          <Autocomplete
            value={valueSingle}
            onChange={(_: unknown, newValue: string | null) => {
              setValueSingle(newValue);
            }}
            className="myDropDown"
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
              <li {...props} className="myDropDown__element">
                {option}
                <Checkbox
                  icon={<></>}
                  checkedIcon={checkedIcon}
                  className="myDropDown__checkbox"
                  checked={selected}
                />
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                placeholder="Favorites"
                className="myDropDown__input"
              />
            )}
          />
        </StyledEngineProvider>
      );
      break;

    default:
      break;
  }
};

export default MyDropDown;
