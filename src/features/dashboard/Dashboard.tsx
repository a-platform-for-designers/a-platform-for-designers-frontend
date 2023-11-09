import { Outlet } from "react-router-dom";
import "./Dashboard.scss";
import { Box, StyledEngineProvider } from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Asidebar } from "./components";

const Dashboard: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Header />
      <Box component="main" className="dashboard">
        <Box className="dashboard__container">
          <Asidebar />

          <Box flexGrow={1}>
            <Outlet />
          </Box>
        </Box>
      </Box>
      <Footer />
    </StyledEngineProvider>
  );
};

export default Dashboard;
