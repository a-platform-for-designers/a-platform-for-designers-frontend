import { Components, Theme } from "@mui/material";

const muiPaperCustom: Components<Omit<Theme, "components">> = {
  MuiPaper: {
    styleOverrides: {
      root: () => ({ boxShadow: "none" }),
    },
  },
};

export default muiPaperCustom;
