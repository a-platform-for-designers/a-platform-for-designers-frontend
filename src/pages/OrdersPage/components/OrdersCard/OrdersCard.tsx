import { Avatar, Box, IconButton, Typography } from "@mui/material";
import "./OrdersCard.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import { IOrderDataItem } from "@/types";
import { useState } from "react";

import FavouritesIcon from "../../../../assets/icons/FavouritesDark.svg";
import FavouritesIconActive from "../../../../assets/icons/FavouritesActive.svg";

import AvatarIcon from "../../../../assets/images/designerscarousel-avatar.png";

interface IProps {
  order: IOrderDataItem;
  openPopup: (userInfo: string) => void;
}

const DesignersCard: React.FC<IProps> = ({ order, openPopup }) => {
  const [reply, setReply] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  function handleReply() {
    if (!reply) {
      setReply(true);
      return;
    }
    setReply(false);
  }

  const userInfo = `${order.first_name} ${order.last_name}`;

  function handlePopupOpen() {
    openPopup(userInfo);
  }

  function handleFavourite() {
    if (isFavourite) {
      setIsFavourite(false);
      return;
    }
    setIsFavourite(true);
  }

  return (
    <Box className="ordersCard">
      <div className="ordersCard__header">
        <div className="ordersCard__user">
          <Avatar className="ordersCard__avatar" src={AvatarIcon} />
          <Typography component="h2" className="ordersCard__name">
            {order.first_name} {order.last_name}
          </Typography>
        </div>
        <IconButton aria-label="favourite" onClick={handleFavourite}>
          {!isFavourite ? (
            <img
              className="ordersCard__favourite-icon"
              src={FavouritesIcon}
              alt="Иконка меню"
            />
          ) : (
            <img
              className="ordersCard__favourite-icon"
              src={FavouritesIconActive}
              alt="Иконка меню"
            />
          )}
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
        <Typography component="p" className="ordersCard__specialization">
          Сфера: {order.sphere}
        </Typography>
        <Typography component="p" className="ordersCard__price">
          {order.price} ₽
        </Typography>
      </div>

      <div className="ordersCard__buttons">
        <MyButton
          type="button"
          variant="outlined"
          size="large"
          onClick={handlePopupOpen}
        >
          Написать
        </MyButton>
        <MyButton
          type="button"
          variant="outlined"
          size="large"
          onClick={handleReply}
          className="ordersCard__button"
        >
          {!reply ? "Откликнуться" : "Удалить отклик"}
        </MyButton>
      </div>
    </Box>
  );
};

export default DesignersCard;
