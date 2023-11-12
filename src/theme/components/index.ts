import { Components, Theme } from "@mui/material";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    tag: true;
    error: true;
  }
}

const components: Components<Omit<Theme, "components">> = {
  // ------------------------------------------------------------------------------- CONTAINER
  MuiContainer: {
    styleOverrides: {
      root: () => ({ padding: "24px 0" }),
    },
  },
  // ------------------------------------------------------------------------------- CONTAINER
  MuiPaper: {
    styleOverrides: {
      root: () => ({ boxShadow: "none" }),
    },
  },
  //--------------------------------------------------------------------- FilledInput
  MuiFilledInput: {
    styleOverrides: {
      input: ({ theme }) => ({
        color: theme.palette.text.primary,
      }),
      /*       adornedEnd: ({ theme }) => ({
        color: theme.palette.info.main,
      }), */
    },
  },

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
  // ------------------------------------------------------------------------------- BUTTON
  MuiButton: {
    styleOverrides: {
      root: () => ({
        borderRadius: "100px",
        textTransform: "none",
        boxSizing: "border-box",
      }),
      sizeMedium: () => ({
        minWidth: "212px",
        maxHeight: "40px",
        padding: "10px 24px",
        lineHeight: "20px",
        letterSpacing: "0.1px",
        fontSize: "14px",
      }),
      fullWidth: () => ({
        width: "100%",
      }),

      outlined: ({ theme }) => ({
        borderColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.secondary.light,
        },
      }),
      //------------Вариант text
      text: ({ theme }) => ({
        "&:hover": {
          backgroundColor: "transparent",
        },
        "&:active": {
          color: theme.palette.primary.light,
        },
      }),
    },

    variants: [
      {
        props: {
          variant: "error",
        },
        style: ({ theme }) => ({
          color: theme.palette.error.light,
          backgroundColor: "transparent",
          padding: "0",
          minWidth: "0",
          minHeight: "0",
          border: "none",
          "&:hover": {
            backgroundColor: "transparent",
            color: theme.palette.error.main,
          },
        }),
      },
      {
        props: { variant: "tag", color: "primary" },
        style: ({ theme }) => ({
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.light,
          border: `4px solid transparent`,
          "&:hover": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.light,
            border: `4px solid  ${theme.palette.primary.main}3d`,
          },
          "&:active": {
            "&:hover": {
              border: `4px solid  transparent`,
            },
            backgroundColor: `${theme.palette.primary.main}3d`,
            color: theme.palette.text.primary,
            border: `4px solid  ${theme.palette.primary.main}3d`,
          },
        }),
      },
    ],
  },
};

export default components;
