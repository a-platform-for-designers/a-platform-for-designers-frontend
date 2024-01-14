import { Avatar, Box, Typography } from "@mui/material";
import "./ArchiveCard.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import { IMyOrderResponse } from "@/types";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import deleteCardIcon from "@/assets/icons/deleteCard-button.svg";
import { ordersService } from "@/api";

interface IProps {
  order: IMyOrderResponse;
  refreshOrdersList?: (id: number) => void;
}

const ArchiveCard: React.FC<IProps> = ({ order, refreshOrdersList }) => {
  const [customerSpecialization, setCustomerSpecialization] =
    useState<string>("");
  const { user } = useAppSelector((state) => state.user); // авторизованный пользователь
  const customerUser = user?.is_customer;
  const userInfo = {
    name: `${order.customer.first_name} ${order.customer.last_name}`,
    avatar: order.customer.photo,
  };

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

  function handleDeleteReply() {
    const dataResponse = {
      customer: order.customer,
      title: order.title,
      specialization: order.specialization,
      payment: order.payment,
      sphere: order.sphere,
      description: order.description,
      is_published: order.is_published,
    };
    const deleteOrderResponse = async () => {
      await ordersService.deleteResponseOrder(dataResponse, order.id);
    };
    deleteOrderResponse();
    if (refreshOrdersList) {
      refreshOrdersList(order.id);
    }
  }

  function handlePublish() {
    const dataArchive = {
      customer: order.customer,
      title: order.title,
      specialization: order.specialization,
      payment: order.payment,
      sphere: order.sphere,
      description: order.description,
      is_published: true,
    };

    const patchOrderResponse = async () => {
      await ordersService.patchResponseOrder(dataArchive, Number(order.id));
      return;
    };
    patchOrderResponse();
    if (refreshOrdersList) {
      refreshOrdersList(order.id);
    }
  }

  function deleteOrder() {
    const deleteOrderResponse = async () => {
      await ordersService.deleteOrder(Number(order.id));
      return;
    };
    deleteOrderResponse();
    if (refreshOrdersList) {
      refreshOrdersList(order.id);
    }
  }

  return (
    <Box className="archiveCard">
      <div className="archiveCard__user">
        <Avatar className="archiveCard__avatar" src={order.customer.photo} />
        <Typography component="h2" className="archiveCard__name">
          {userInfo.name}
        </Typography>
      </div>

      <div>
        <Typography component="h3" className="archiveCard__title">
          {order.title && order.title}
        </Typography>
        <Typography component="p" className="archiveCard__description">
          {order.description && order.description}
        </Typography>
        <Typography component="p" className="archiveCard__specialization">
          Кто нужен: {customerSpecialization}
        </Typography>
        <Typography component="p" className="archiveCard__specialization">
          Сфера: {order.sphere && order.sphere.name}
        </Typography>
        <Typography component="p" className="archiveCard__price">
          {order.payment && order.payment} ₽
        </Typography>
      </div>

      <div className="archiveCard__buttons">
        {customerUser ? (
          <>
            <MyButton
              type="button"
              variant="text"
              size="large"
              className="archiveCard__button"
              onClick={handlePublish}
            >
              Опубликовать&nbsp;снова
            </MyButton>
            <MyButton
              type="button"
              variant="text"
              size="large"
              className="archiveCard__button archiveCard__del-button"
              onClick={deleteOrder}
            >
              <img src={deleteCardIcon} />
              Удалить
            </MyButton>
          </>
        ) : (
          <MyButton
            type="button"
            variant="text"
            size="large"
            className="archiveCard__button"
            onClick={handleDeleteReply}
          >
            Удалить
          </MyButton>
        )}
      </div>
    </Box>
  );
};

export default ArchiveCard;
