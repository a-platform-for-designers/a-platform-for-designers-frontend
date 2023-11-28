import { Components, Theme } from "@mui/material";

const muiCheckboxCustom: Components<Omit<Theme, "components">> = {
  MuiCheckbox: {
    styleOverrides: {
      root: () => ({
        display: "flex",
        justifyContent: "space-between",
        margin: "0",
      }),
    },
  },
};

export default muiCheckboxCustom;
