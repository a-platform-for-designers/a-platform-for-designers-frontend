import { Box, StyledEngineProvider } from "@mui/material";
import "./Preloader.scss";
import React from "react";

const Preloader: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Box className="preloader">
        <Box className="preloader__content"></Box>
      </Box>
    </StyledEngineProvider>
  );
};

export default Preloader;
