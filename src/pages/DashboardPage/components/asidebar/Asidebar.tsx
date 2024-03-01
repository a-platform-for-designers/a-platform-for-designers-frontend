import { Paper, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks/reduxHooks";
import { IDataItem } from "@/types/index";
import "./Asidebar.scss";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { logOut } from "@/redux/slices/authSlice";

const Asidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isActive = (path: string): boolean => {
    return location.pathname.includes(path);
  };

  const { user } = useAppSelector((state) => state.user);
  const isCustomer = user?.is_customer;
  const isMentor =
    user?.profiledesigner?.specialization?.some(
      (item) => (item as IDataItem).name === "Менторство"
    ) ?? false;

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
      title: "Настройки",
      link: "settings",
      id: 1054,
    },
  ];

  const customerNavItems = [
    {
      title: "Профиль",
      link: "profile",
      id: 1050,
    },
    {
      title: "Настройки",
      link: "settings",
      id: 1054,
    },
  ];

  const mentorsNavItems = [
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
      title: "Менторство",
      link: "mentorship",
      id: 1052,
    },
    {
      title: "Настройки",
      link: "settings",
      id: 1054,
    },
  ];

  const items = isCustomer
    ? customerNavItems
    : isMentor
    ? mentorsNavItems
    : navItems;

  const navElement = items.map((item) => {
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

  async function logout() {
    await dispatch(logOut());
  }

  return (
    <Paper className="asidebar__nav">
      <List component="nav">
        {navElement}

        <ListItemButton
          className="asidebar__nav-item asidebar__nav-item_type_exit"
          onClick={async () => {
            await logout();
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
