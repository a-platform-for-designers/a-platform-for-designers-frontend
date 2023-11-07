import { Outlet } from "react-router-dom";
import "./Dashboard.scss";
import { Box, StyledEngineProvider, Container } from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Asidebar } from "./components";

const Dashboard: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Header />
      <Box component="main" className="dashboard">
        <Container className="dashboard__container">
          <Asidebar />

          <Box flexGrow={1}>
            <Outlet />
          </Box>
        </Container>
      </Box>
      <Footer />
    </StyledEngineProvider>
  );
};

export default Dashboard;
