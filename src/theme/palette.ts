import { PaletteOptions } from "@mui/material";

const common = {
  black: "#000",
  white: "fff",
};

const text = {
  light: { primary: "#000", secondary: "#6B6B6B", disabled: "#98979A" },
};

const primary = {
  light: {
    main: "#6900EE",
    light: "#7647EF" /* #6E41E2 */,
    dark: "#6435DD",
    contrastText: "#fff",
  },
};

const background = {
  light: { default: "#fff", paper: "#fff" },
};

const gray = {
  light: { main: "#6B6B6B" },
};

const errorColors = {
  light: {
    main: "#db524e",
    light: "#b3261e",
    dark: "#c7302b",
    contrastText: "#fff",
  },
};

const successColors = {
  light: {
    main: "#2e7d32",
    light: "#4caf50",
    dark: "#1b5e20",
    contrastText: "#fff",
  },
};

const actionColors = {
  light: {
    disabled: "#98979A",
    disabledBackground: "#E3E3E4",
  },
};

//TODO secondary ниже проверить
const secondary = {
  light: {
    main: "#6b6b6b",
    light: "#F5F5F5",
    dark: "#6900EE",
    contrastText: "#fff",
  },
};

const palette: PaletteOptions = {
  common,
  primary: primary.light,
  secondary: secondary.light,
  text: text.light,
  error: errorColors.light,
  success: successColors.light,
  action: actionColors.light,
  background: background.light,
  info: gray.light,
};

export const lightPalette: PaletteOptions = {
  mode: "light",
  ...palette,
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  ...palette,
};

export default palette;
