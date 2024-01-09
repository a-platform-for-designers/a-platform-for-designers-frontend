import { Avatar, Box, IconButton, Typography } from "@mui/material";
import "./MyOrdersCard.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import { IOrdersList, IUserInfo, IUser, IOrderInfoResponse } from "@/types";
import { useEffect, useState } from "react";
import FavouritesIcon from "@/assets/icons/FavouritesDark.svg";
import FavouritesIconActive from "@/assets/icons/FavouritesActive.svg";
import EditIcon from "@/assets/icons/editCardButton.svg";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { userService, ordersService } from "@/api";

interface IProps {
  order: IOrdersList;
  openPopup: (userInfo: IUserInfo) => void;
  refreshOrdersList?: (id: number) => void;
  isOrderesPage?: boolean;
}

const OrdersCard: React.FC<IProps> = ({
  order,
  openPopup,
  refreshOrdersList,
  isOrderesPage,
}) => {
  const [reply, setReply] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [customerSpecialization, setCustomerSpecialization] =
    useState<string>("");

  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user); // авторизованный пользователь
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState<IUser>(); // пользователь чья страница (id через путь)
  const isMyProfile = currentUser?.id === user?.id && currentUser !== undefined;
  const customerUser = user?.is_customer;
  const location = useLocation();
  const [isUsersOrders, setIsUsersOrders] = useState<boolean>(false);
  const [orderInfo, setOrderInfo] = useState<IOrderInfoResponse>(); // переменная для количества откликов на заказ
  const myCard = order.customer.id === user?.id;
  const [countName, setCountName] = useState<string>("");

  const countResponse = orderInfo?.applicants?.length; //количество откликов

  useEffect(() => {
    if (countResponse == (1 || 21 || 31)) {
      setCountName("отклик");
    } else if (
      countResponse == (2 || 3 || 4 || 22 || 23 || 24 || 32 || 33 || 34)
    ) {
      setCountName("отклика");
    } else {
      setCountName("откликов");
    }
  }, [countResponse]);

  useEffect(() => {
    if (order.is_responded_order) {
      setReply(true);
    }
  }, [order.is_responded_order]);

  useEffect(() => {
    if (location.pathname.endsWith("/my-orders/orders")) {
      setIsUsersOrders(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (id) {
      (async () => {
        const userInfo = await userService.getUserById(Number(id));
        setCurrentUser(userInfo);
      })();
    }
  }, [id]);

  // в данных заказа нет количества откликов
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await ordersService.getOrderInfo(Number(order.id));
        setOrderInfo(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [order.id]);

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

  const dataResponse = {
    customer: order.customer,
    title: order.title,
    specialization: order.specialization,
    payment: order.payment,
    sphere: order.sphere,
    description: order.description,
    is_published: order.is_published,
  };

  function handleReply() {
    if (!reply) {
      const postOrderResponse = async () => {
        await ordersService.postResponseOrder(dataResponse, order.id);
        return;
      };
      postOrderResponse();
      setReply(true);
    } else {
      const deleteOrderResponse = async () => {
        await ordersService.deleteResponseOrder(dataResponse, order.id);
      };
      deleteOrderResponse();
      if (refreshOrdersList) {
        refreshOrdersList(order.id);
      }
      setReply(false);
    }
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

  function handleDeleteReply() {
    const deleteOrderResponse = async () => {
      await ordersService.deleteResponseOrder(dataResponse, order.id);
    };
    deleteOrderResponse();
    if (refreshOrdersList) {
      refreshOrdersList(order.id);
    }
  }

  return (
    <Box className="ordersCard">
      <div>
        <div className="ordersCard__header">
          <div
            className="ordersCard__user"
            onClick={() => navigate(`/my-orders/orders`)}
          >
            <Avatar className="ordersCard__avatar" src={order.customer.photo} />
            <Typography component="h2" className="ordersCard__name">
              {userInfo.name}
            </Typography>
          </div>
          {(!isMyProfile && !customerUser) || !myCard ? (
            <>
              <IconButton aria-label="favourite" onClick={handleFavourite}>
                {!isFavourite ? (
                  <img
                    className="ordersCard__favourite-icon"
                    src={FavouritesIcon}
                    alt="Иконка избранное"
                  />
                ) : (
                  <img
                    className="ordersCard__favourite-icon"
                    src={FavouritesIconActive}
                    alt="Иконка избранное"
                  />
                )}
              </IconButton>
            </>
          ) : (
            <>
              {!isOrderesPage ? (
                <div className="ordersCard__counts">
                  {countResponse} {countName}
                </div>
              ) : null}
              <IconButton
                aria-label="favourite"
                onClick={() => navigate("/orders/create")}
              >
                <img
                  className="ordersCard__favourite-icon"
                  src={EditIcon}
                  alt="Иконка редактирования"
                />
              </IconButton>
            </>
          )}
        </div>

        <div onClick={() => navigate(`/my-orders/orders`)}>
          <Typography component="h3" className="ordersCard__title">
            {order.title && order.title}
          </Typography>
          <Typography component="p" className="ordersCard__description">
            {order.description && order.description}
          </Typography>
          <Typography component="p" className="ordersCard__specialization">
            Кто нужен: {customerSpecialization}
          </Typography>
          <Typography component="p" className="ordersCard__specialization">
            Сфера: {order.sphere && order.sphere.name}
          </Typography>
          <Typography component="p" className="ordersCard__price">
            {order.payment && order.payment} ₽
          </Typography>
        </div>
      </div>

      {(!isMyProfile && !customerUser) || !myCard ? (
        <>
          <div className="ordersCard__buttons">
            <MyButton
              type="button"
              variant="outlined"
              size="large"
              onClick={handlePopupOpen}
            >
              Написать
            </MyButton>
            {!customerUser && !isOrderesPage ? (
              <>
                {!customerUser || !isUsersOrders ? (
                  <MyButton
                    type="button"
                    variant={isUsersOrders ? "text" : "outlined"}
                    size="large"
                    onClick={handleReply}
                    className="ordersCard__button"
                  >
                    {!reply ? "Откликнуться" : "Удалить отклик"}
                  </MyButton>
                ) : (
                  <MyButton
                    type="button"
                    variant="text"
                    size="large"
                    onClick={handleDeleteReply}
                    className="ordersCard__button"
                  >
                    Удалить отклик
                  </MyButton>
                )}
              </>
            ) : null}
          </div>
        </>
      ) : (
        <div className="ordersCard__button-in-profile">
          <MyButton
            type="button"
            size="large"
            variant="outlined"
            onClick={() => navigate(`/my-orders/orders`)}
          >
            Посмотреть отклики
          </MyButton>
        </div>
      )}
    </Box>
  );
};

export default OrdersCard;
