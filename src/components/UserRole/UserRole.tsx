import Box from "@mui/material/Box";
import "./UserRole.scss";
import { List, ListItem } from "@mui/material";
import { PropsWithChildren } from "react";

type Props = {
  onClick?: () => void;
};

const UserRole: React.FC<PropsWithChildren<Props>> = ({ onClick }) => {
  return (
    <Box className="role">
      <h2 className="role__heading">Выберите роль</h2>
      <Box className="role__wrapper">
        <Box className="role__container" onClick={onClick}>
          <h3 className="role__name">Заказчик</h3>
          <List className="role__abilities">
            Вам доступно:
            <ListItem className="role__ability">Создание заказов</ListItem>
            <ListItem className="role__ability">Поиск фрилансеров</ListItem>
          </List>
        </Box>
        <Box className="role__container" onClick={onClick}>
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
