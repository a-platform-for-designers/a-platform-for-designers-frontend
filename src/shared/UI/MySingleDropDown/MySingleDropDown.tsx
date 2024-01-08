import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import "./MySingleDropDown.scss";
import { StyledEngineProvider } from "@mui/material/styles";

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
};

const MySingleDropDown: React.FC<TMySingleDropDownProps> = ({
  options,
  value = "",
  onChange,
  size = "fullWidth",
  className,
  placeholder,
}) => {
  const checkedIcon = <CheckOutlinedIcon fontSize="small" color="action" />;
  // hardcoded for a while, soon it will be changed
  const sizeSelector =
    size === "medium"
      ? "myMultipleDropDown__size_medium"
      : "myMultipleDropDown__size_full-width";

  return (
    <StyledEngineProvider injectFirst>
      <Autocomplete
        value={value as TValueSingle}
        onChange={onChange as TOnChangeSingle}
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
          <TextField
            {...params}
            variant="filled"
            placeholder={placeholder}
            className="mySingleDropDown__input"
          />
        )}
      />
    </StyledEngineProvider>
  );
};

export default MySingleDropDown;
