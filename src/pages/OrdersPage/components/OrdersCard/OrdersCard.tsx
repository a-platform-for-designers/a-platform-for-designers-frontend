import { Avatar, Box, IconButton, Typography } from "@mui/material";
import "./OrdersCard.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import { IOrderDataItem } from "@/types";
import FavouritesIcon from "../../../../assets/icons/FavouritesDark.svg";
import AvatarIcon from "../../../../assets/images/designerscarousel-avatar.png";

interface IProps {
  order: IOrderDataItem;
}

const DesignersCard: React.FC<IProps> = ({ order }) => {
  return (
    <Box className="ordersCard">
      <div className="ordersCard__header">
        <div className="ordersCard__user">
          <Avatar className="ordersCard__avatar" src={AvatarIcon} />
          <Typography component="h2" className="ordersCard__name">
            {order.first_name} {order.last_name}
          </Typography>
        </div>
        <IconButton aria-label="favourite">
          <img
            className="ordersCard__favourite-icon"
            src={FavouritesIcon}
            alt="Иконка меню"
          />
        </IconButton>
      </div>

      <div>
        <Typography component="h3" className="ordersCard__title">
          {order.title}
        </Typography>
        <Typography component="p" className="ordersCard__title">
          {order.description}
        </Typography>
        <Typography component="p" className="ordersCard__specialization">
          Кто нужен: {order.specialization}
        </Typography>
        <Typography component="p" className="ordersCard__name">
          Сфера: {order.sphere}
        </Typography>
        <Typography component="p" className="ordersCard__name">
          {order.price} ₽
        </Typography>
      </div>

      <div className="ordersCard__buttons">
        <MyButton variant="outlined" size="large" onClick={() => {}}>
          Написать
        </MyButton>
        <MyButton variant="outlined" size="large" onClick={() => {}}>
          Откликнуться
        </MyButton>
      </div>
    </Box>
  );
};

export default DesignersCard;
