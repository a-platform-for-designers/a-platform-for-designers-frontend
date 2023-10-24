import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import "./MyDropDown.scss";
import { StyledEngineProvider } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import closeIcon from "../../../assets/icons/close.svg";

const MyDropDown: React.FC = () => {
  const checkedIcon = <CheckOutlinedIcon fontSize="small" color="action" />;

  return (
    <StyledEngineProvider injectFirst>
      <Autocomplete
        multiple
        className="myDropDown"
        options={top100Films}
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
            variant="outlined"
            label="Movies"
            placeholder="Favorites"
            className="myDropDown__input"
          />
        )}
      />
    </StyledEngineProvider>
  );
};

export default MyDropDown;

const top100Films = ["Анимация", "Загрузка", "Портфолио"];
