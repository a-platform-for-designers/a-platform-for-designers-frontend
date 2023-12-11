import { Avatar, Box, IconButton, Typography } from "@mui/material";
import "./OrdersCard.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import { IOrdersList, IUserInfo } from "@/types";
import { useEffect, useState } from "react";

import FavouritesIcon from "../../../../assets/icons/FavouritesDark.svg";
import FavouritesIconActive from "../../../../assets/icons/FavouritesActive.svg";
import { useAppSelector } from "@/hooks/reduxHooks";

interface IProps {
  order: IOrdersList;
  openPopup: (userInfo: IUserInfo) => void;
}

const OrdersCard: React.FC<IProps> = ({ order, openPopup }) => {
  const [reply, setReply] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [customerSpecialization, setCustomerSpecialization] =
    useState<string>("");

  const { specializations } = useAppSelector((state) => state.data);

  console.log(Object.keys(specializations));

  useEffect(() => {
    if (order.specialization.name === "Графический дизайн") {
      setCustomerSpecialization("Графический дизайнер");
      return;
    }
    if (order.specialization.name === "Иллюстрация") {
      setCustomerSpecialization("Иллюстратор");
      return;
    }
    if (order.specialization.name === "3D-дизайн") {
      setCustomerSpecialization("3D-визуализатор");
      return;
    }
    if (order.specialization.name === "Веб-дизайн") {
      setCustomerSpecialization("Веб-дизайнер");
      return;
    }
  }, [order.specialization.name]);

  function handleReply() {
    if (!reply) {
      setReply(true);
      return;
    }
    setReply(false);
  }

  const userInfo = {
    name: `${order.customer.first_name} ${order.customer.last_name}`,
    avatar: order.customer.photo,
  };

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
          <Avatar className="ordersCard__avatar" src={order.customer.photo} />
          <Typography component="h2" className="ordersCard__name">
            {userInfo.name}
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
          Кто нужен: {customerSpecialization}
        </Typography>
        <Typography component="p" className="ordersCard__specialization">
          Сфера: {order.sphere.name}
        </Typography>
        <Typography component="p" className="ordersCard__price">
          {order.payment} ₽
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

export default OrdersCard;
