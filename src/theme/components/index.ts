import { Components, Theme } from "@mui/material";
import muiButtonCustom from "./MuiButton";
import muiContainerCustom from "./MuiContainer";
import muiPaperCustom from "./MuiPaper";
import muiTypographyCustom from "./MuiTypography";
import muiFilledInputCustom from "./MuiFilledInput";
import muiCheckboxCustom from "./MuiCheckbox";

const components: Components<Omit<Theme, "components">> = {
  // ------- Typography
  ...muiTypographyCustom,

  // ------- Container
  ...muiContainerCustom,

  // ------- Button
  ...muiButtonCustom,

  // ----- Paper
  ...muiPaperCustom,

  //------ FilledInput
  ...muiFilledInputCustom,

  ...muiCheckboxCustom,

  // ----- Other
};

export default components;
