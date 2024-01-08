import { Outlet, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { Box, StyledEngineProvider } from "@mui/material";
import { Asidebar } from "./components";
import { useAppSelector } from "@/hooks/reduxHooks";

const Dashboard: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const [noAsidebar, setNoAsidebar] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname.endsWith("/preview")) {
      setNoAsidebar(true);
    }
  }, [location]);

  return (
    <StyledEngineProvider injectFirst>
      {isAuth && (
        <Box component="main" className="dashboard">
          <Box className="dashboard__container">
            {!noAsidebar ? <Asidebar /> : null}
            <Box flexGrow={1}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      )}
    </StyledEngineProvider>
  );
};

export default Dashboard;
