import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import {
  Box,
  Paper,
  List,
  ListItemText,
  StyledEngineProvider,
  ListItemButton,
  Container,
} from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname.includes(path);
  };

  const navItems = [
    {
      title: "Профиль",
      link: "profile",
      id: 1050,
    },
    {
      title: "Портфолио",
      link: "portfolio",
      id: 1051,
    },
    {
      title: "Работа",
      link: "work",
      id: 1052,
    },
    {
      title: "Заказы",
      link: "orders",
      id: 1053,
    },

    {
      title: "Настройки",
      link: "settings",
      id: 1054,
    },
  ];

  const navElement = navItems.map((item) => {
    return (
      <ListItemButton
        key={item.id}
        onClick={() => navigate(item.link)}
        className={`dashboard__nav-item ${
          isActive(item.link) ? "dashboard__nav-item_active" : ""
        } `}
      >
        <ListItemText primary={item.title} />
      </ListItemButton>
    );
  });

  function logout() {}

  return (
    <StyledEngineProvider injectFirst>
      <Header />
      <Box component="main" className="dashboard">
        <Container className="dashboard__container">
          <Paper className="dashboard__nav">
            <List component="nav">
              {navElement}

              <ListItemButton
                className="dashboard__nav-item dashboard__nav-item_type_exit"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                <ListItemText primary="Выход" />
              </ListItemButton>
            </List>
          </Paper>

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
