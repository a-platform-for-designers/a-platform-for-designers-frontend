import { Components, Theme } from "@mui/material";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    tag: true;
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

  // ------------------------------------------------------------------------------- BUTTON
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: "0",
        minWidth: "185px",
        minHeight: "40px",
        borderRadius: "100px",
        textTransform: "none",
        boxShadow: "none",
        fontSize: theme.typography.fontSize,
        "&:hover": {
          boxShadow: "none",
        },
      }),

      //---------------------------------------------------------- text
      text: ({ theme }) => ({
        "&:hover": {
          color: theme.palette.primary.light,
          backgroundColor: "transparent",
        },
        "&:active": {
          color: theme.palette.primary.dark,
        },
      }),

      //---------------------------------------------------------- outlined
      outlined: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        "&:hover": {
          backgroundColor: theme.palette.background.default,
        },
        "&:active": {
          backgroundColor: theme.palette.background.default,
        },
      }),
      outlinedPrimary: ({ theme }) => ({
        border: `1px solid ${theme.palette.primary.main}`,
        "&:hover": {
          backgroundColor: "transparent",
          color: theme.palette.primary.light,
          borderColor: theme.palette.primary.light,
        },
        "&:active": {
          backgroundColor: "transparent",
          color: theme.palette.primary.dark,
          borderColor: theme.palette.primary.dark,
        },
      }),
      containedPrimary: ({ theme }) => ({
        "&:active": {
          backgroundColor: theme.palette.primary.dark,
        },
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
        },
      }),
    },
    variants: [
      {
        props: { variant: "tag", color: "primary" },
        style: ({ theme }) => ({
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.grey[100],
          border: `4px solid transparent`,
          "&:hover": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.grey[100],
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
