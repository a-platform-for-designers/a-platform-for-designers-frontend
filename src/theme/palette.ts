import { PaletteOptions } from "@mui/material";

const primary = {
  light: {
    main: "#6900EE",
    light: "#7647EF",
    dark: "#6435DD",
    contrastText: "#fff",
  },
  dark: {
    main: "#00f",
    light: "#f00",
    dark: "#0f0",
    contrastText: "#fff",
  },
};

const secondary = {
  light: {
    main: "#6900EE",
    light: "#6900EE",
    dark: "#6900EE",
    contrastText: "#fff",
  },
  dark: {
    main: "#0ff",
    light: "#f00",
    dark: "#0f0",
    contrastText: "#fff",
  },
};

const background = {
  light: { default: "#fff", paper: "#fff" },
  dark: { default: "#000", paper: "#000" },
};

const text = {
  light: { primary: "#000", secondary: "#49454F" },
  dark: { primary: "#fff", secondary: "#000" },
};

const palette: PaletteOptions = {
  primary: primary.light,
  secondary: secondary.light,
  text: text.light,
  error: { main: "#db524e" },
  success: { main: "#27AE60" },
  action: {
    disabled: "#98979A",
    disabledBackground: "#e3e3e3",
  },
  background: background.light,
};

export const lightPalette: PaletteOptions = {
  mode: "light",
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: primary.dark,
  secondary: secondary.dark,
  text: text.dark,
  error: { main: "#db524e" },
  action: {
    disabled: "#98979A",
    disabledBackground: "#e3e3e3",
  },
  background: background.dark,
};

export default palette;
