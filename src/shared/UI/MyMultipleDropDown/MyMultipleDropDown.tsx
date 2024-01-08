import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import "./MyMultipleDropDown.scss";
import { StyledEngineProvider } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import closeIcon from "../../../assets/icons/close.svg";
import AddIcon from "@mui/icons-material/Add";

type TValueMulty = string[];

export type TOnChangeMylty = (
  event: React.SyntheticEvent<Element, Event>,
  newValue: TValueMulty
) => void;

export type TMultyDropDown = {
  value: TValueMulty;
  onChange: TOnChangeMylty;
  size?: "medium" | "fullWidth";
};

type TMyMultipleDropDownProps = TMultyDropDown & {
  options: string[];
  className?: string;
  placeholder?: string;
};

const MyMultipleDropDown: React.FC<TMyMultipleDropDownProps> = ({
  options,
  onChange,
  size = "fullWidth",
  value = [],
  className,
  placeholder,
}) => {
  const checkedIcon = <CheckOutlinedIcon fontSize="small" color="action" />;
  // by now, it hardcoded, but it will be changed soon
  const sizeSelector =
    size === "medium"
      ? "myMultipleDropDown__size_medium"
      : "myMultipleDropDown__size_full-width";

  return (
    <StyledEngineProvider injectFirst>
      <Autocomplete
        value={value as TValueMulty}
        onChange={onChange as TOnChangeMylty}
        multiple
        className={`myMultipleDropDown ${className} ${sizeSelector}`}
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
          <li {...props} className="myMultipleDropDown__element">
            {option}
            <Checkbox
              icon={<AddIcon />}
              checkedIcon={checkedIcon}
              className="myMultipleDropDown__checkbox"
              checked={selected}
            />
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            placeholder={placeholder}
            className="myMultipleDropDown__input"
          />
        )}
      />
    </StyledEngineProvider>
  );
};

export default MyMultipleDropDown;
