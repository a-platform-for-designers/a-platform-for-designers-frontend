import type { Decorator, Preview } from "@storybook/react";
import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "../src/theme/index";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

// Create a theme decorator
const withTheme: Decorator = (Story) => {
  // Determine which theme should be provided from your earlier
  // imports by matching on the background color

  // Ship it!
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline enableColorScheme />
        <Story />
      </ThemeProvider>
    </>
  );
}; // Then setup your own set of decorators as you need
export const decorators: Decorator[] = [
  // And ensure our new decorator is included
  withTheme,
];

export default preview;
