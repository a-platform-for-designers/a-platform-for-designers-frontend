import { Components, Theme } from "@mui/material";

const muiFilledInputCustom: Components<Omit<Theme, "components">> = {
  MuiFilledInput: {
    styleOverrides: {
      input: ({ theme }) => ({
        color: theme.palette.text.primary,
      }),
    },
  },
};

export default muiFilledInputCustom;
