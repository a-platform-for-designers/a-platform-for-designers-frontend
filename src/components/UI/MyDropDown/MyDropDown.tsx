import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import "./MyDropDown.scss";
import { StyledEngineProvider } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import closeIcon from "../../../assets/icons/close.svg";
import AddIcon from "@mui/icons-material/Add";

type TValueSingle = string | null;
type TValueMulty = string[];
type TOnChangeSingle = (
  event: React.SyntheticEvent<Element, Event>,
  newValue: TValueSingle
) => void;
type TOnChangeMylty = (
  event: React.SyntheticEvent<Element, Event>,
  newValue: TValueMulty
) => void;

type TSingleDropDown = {
  variant?: "single";
  value: TValueSingle;
  onChange: TOnChangeSingle;
};

type TMultyDropDown = {
  variant?: "multiple";
  value: TValueMulty;
  onChange: TOnChangeMylty;
};

type TMyDropDownProps = (TSingleDropDown | TMultyDropDown) & {
  options: string[];
  className?: string;
  placeholder?: string;
};

const MyDropDown: React.FC<TMyDropDownProps> = ({
  variant = "single",
  options,
  value,
  onChange,
  className,
  placeholder,
}) => {
  const checkedIcon = <CheckOutlinedIcon fontSize="small" color="action" />;

  switch (variant) {
    case "multiple":
      return (
        <StyledEngineProvider injectFirst>
          <Autocomplete
            value={value as TValueMulty}
            onChange={onChange as TOnChangeMylty}
            multiple
            className={`myDropDown ${className}`}
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
                  icon={<AddIcon />}
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
                placeholder={placeholder}
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
            value={value as TValueSingle}
            onChange={onChange as TOnChangeSingle}
            className={`myDropDown ${className}`}
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
                placeholder={placeholder}
                className="myDropDown__input"
              />
            )}
          />
        </StyledEngineProvider>
      );

    default:
      break;
  }
};

export default MyDropDown;
