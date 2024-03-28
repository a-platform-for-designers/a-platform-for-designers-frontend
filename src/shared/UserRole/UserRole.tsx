import Box from "@mui/material/Box";
import "./UserRole.scss";
import { List, ListItem } from "@mui/material";
import { PropsWithChildren } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setCurrentScreen, setUserIsCustomer } from "@/redux/slices/authSlice";
import { Screens } from "@/types";

const UserRole: React.FC<PropsWithChildren> = () => {
  const dispatch = useAppDispatch();

  function chooseCustomerRole(isCustomer: boolean) {
    dispatch(setUserIsCustomer(isCustomer));
    dispatch(setCurrentScreen({ screen: Screens.SignUp }));
  }

  return (
    <Box className="role">
      <h2 className="role__heading">Выберите роль</h2>
      <Box className="role__wrapper">
        <Box
          className="role__container"
          onClick={() => chooseCustomerRole(true)}
        >
          <h3 className="role__name">Заказчик</h3>
          <List className="role__abilities">
            Вам доступно:
            <ListItem className="role__ability">Создание заказов</ListItem>
            <ListItem className="role__ability">Поиск фрилансеров</ListItem>
          </List>
        </Box>
        <Box
          className="role__container"
          onClick={() => chooseCustomerRole(false)}
        >
          <h3 className="role__name">Дизайнер</h3>
          <List className="role__abilities">
            Вам доступно:
            <ListItem className="role__ability">Создание портфолио</ListItem>
            <ListItem className="role__ability">Поиск заказчиков</ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default UserRole;
