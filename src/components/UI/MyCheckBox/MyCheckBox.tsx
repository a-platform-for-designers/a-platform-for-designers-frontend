import "./MyCheckBox.scss";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { StyledEngineProvider } from "@mui/material/styles";

interface IMyCheckBoxProps {
  label: string | React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  onChange: () => void;
  size?: "small" | "medium";
  checked?: boolean;
  labelPlacement?: "top" | "start" | "bottom" | "end";
}

const MyCheckBox: React.FC<IMyCheckBoxProps> = ({
  label = "",
  required = false,
  disabled = false,
  onChange = () => {},
  size = "medium",
  checked = false,
  labelPlacement = "start",
}) => {
  return (
    <StyledEngineProvider injectFirst>
      <FormControlLabel
        required={required}
        control={<Checkbox size={size} className="myCheckBox" />}
        label={label}
        disabled={disabled}
        onChange={onChange}
        className="myCheckBoxLabel"
        checked={checked}
        labelPlacement={labelPlacement}
      />
    </StyledEngineProvider>
  );
};

export default MyCheckBox;
