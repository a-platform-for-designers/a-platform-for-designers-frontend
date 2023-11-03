import { createTheme } from "@mui/material";
import paletteTheme from "..";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    tag: true;
  }
}

const myStyledButtonTheme = createTheme(
  {
    components: {
      MuiButton: {
        styleOverrides: {
          root: () => ({
            padding: "0",
            minWidth: "185px",
            minHeight: "40px",
            borderRadius: "100px",
            textTransform: "none",
            boxShadow: "none",
            fontSize: paletteTheme.typography.fontSize,
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
            style: {
              color: paletteTheme.palette.text.primary,
              backgroundColor: paletteTheme.palette.grey[100],
              border: `4px solid transparent`,
              "&:hover": {
                color: paletteTheme.palette.text.primary,
                backgroundColor: paletteTheme.palette.grey[100],
                border: `4px solid  ${paletteTheme.palette.primary.main}3d`,
              },
              "&:active": {
                "&:hover": {
                  border: `4px solid  transparent`,
                },
                backgroundColor: `${paletteTheme.palette.primary.main}3d`,
                color: paletteTheme.palette.text.primary,
                border: `4px solid  ${paletteTheme.palette.primary.main}3d`,
              },
            },
          },
        ],
      },
    },
  },
  paletteTheme
);

export default myStyledButtonTheme;
