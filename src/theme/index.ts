import { createTheme } from "@mui/material";
import palette, { darkPalette, lightPalette } from "./palette";
import components from "./components";

const theme = createTheme({
  palette,
  components,
  breakpoints: {
    values: { xs: 0, sm: 600, md: 1000, lg: 1440, xl: 1700 },
  },
});

export const lightTheme = createTheme(theme, { palette: lightPalette });

export const darkTheme = createTheme(theme, { palette: darkPalette });

export default theme;
