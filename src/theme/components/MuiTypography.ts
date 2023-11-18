import { Components, Theme } from "@mui/material";

const muiTypographyCustom: Components<Omit<Theme, "components">> = {
  MuiTypography: {
    styleOverrides: {
      button: () => ({
        textAlign: "center",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 500,
      }),
    },
  },
};

export default muiTypographyCustom;
