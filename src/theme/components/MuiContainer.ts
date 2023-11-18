import { Components, Theme } from "@mui/material";

const muiContainerCustom: Components<Omit<Theme, "components">> = {
  MuiContainer: {
    styleOverrides: {
      root: () => ({ padding: "24px 0" }),
    },
  },
};

export default muiContainerCustom;
