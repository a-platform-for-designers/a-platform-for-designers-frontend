import { Outlet } from "react-router-dom";
import "./Dashboard.scss";
import { Box, StyledEngineProvider } from "@mui/material";
import { Asidebar } from "./components";
import { useAppSelector } from "@/hooks/reduxHooks";

const Dashboard: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <StyledEngineProvider injectFirst>
      {isAuth && (
        <Box component="main" className="dashboard">
          <Box className="dashboard__container">
            <Asidebar />
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
