import { Paper, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../../../../api/services/authService";

import "./Asidebar.scss";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { deleteUserInfo } from "@/redux/slices/userSlice";
import { changeAuth } from "@/redux/slices/authSlice";

const Asidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

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
        className={`asidebar__nav-item ${
          isActive(item.link) ? "asidebar__nav-item_active" : ""
        } `}
      >
        <ListItemText primary={item.title} />
      </ListItemButton>
    );
  });

  function logout() {
    authService.logout();
    localStorage.clear();
    dispatch(deleteUserInfo());
    dispatch(changeAuth(false));
  }

  return (
    <Paper className="asidebar__nav">
      <List component="nav">
        {navElement}

        <ListItemButton
          className="asidebar__nav-item asidebar__nav-item_type_exit"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <ListItemText primary="Выход" />
        </ListItemButton>
      </List>
    </Paper>
  );
};

export default Asidebar;
