import {
  Avatar,
  IconButton,
  Typography,
  Stack,
  StyledEngineProvider,
  Box,
} from "@mui/material";
import "./OrderPage.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import MyMessagePopup from "@/shared/UI/MyMessagePopup/MyMessagePopup";
import { IOrderInfoResponse, IOrderResponse } from "@/types";
import { useEffect, useState } from "react";
import FavouritesIconBig from "@/assets/icons/FavouritesIconBig.svg";
import FavouritesIconBigActive from "@/assets/icons/FavouritesIconBigActive.svg";
import RespondedDesignersEmpty from "@/assets/icons/RespondedDesignersEmpty.svg";
import EmptyData from "../ProfilePage/components/EmptyData/EmptyData";

import { useAppSelector } from "@/hooks/reduxHooks";
import { useNavigate, useParams } from "react-router-dom";
import { ordersService } from "@/api";
import RespondedDesigner from "./components/RespondedDesigner/RespondedDesigner";

const OrderPage: React.FC = () => {
  const [reply, setReply] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [customerSpecialization, setCustomerSpecialization] =
    useState<string>("");

  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user); // авторизованный пользователь
  const { id } = useParams();
  const customerUser = user?.is_customer;
  const [orderInfo, setOrderInfo] = useState<IOrderInfoResponse>();
  const myCard = orderInfo?.customer.id === user?.id;
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [dataResponse, setDataResponse] = useState<IOrderResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await ordersService.getOrderInfo(Number(id));
        setOrderInfo(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (orderInfo?.specialization.name === "Графический дизайн") {
      setCustomerSpecialization("Графический дизайнер");
      return;
    }
    if (orderInfo?.specialization.name === "Иллюстрация") {
      setCustomerSpecialization("Иллюстратор");
      return;
    }
    if (orderInfo?.specialization.name === "3D-дизайн") {
      setCustomerSpecialization("3D-визуализатор");
      return;
    }
    if (orderInfo?.specialization.name === "Веб-дизайн") {
      setCustomerSpecialization("Веб-дизайнер");
      return;
    }
  }, [orderInfo?.specialization.name]);

  useEffect(() => {
    if (orderInfo?.is_responded_order) {
      setReply(true);
    }
  }, [orderInfo]);

  useEffect(() => {
    if (orderInfo) {
      const data = {
        customer: orderInfo.customer,
        title: orderInfo.title,
        specialization: orderInfo.specialization,
        payment: orderInfo.payment,
        sphere: orderInfo.sphere,
        description: orderInfo.description,
        is_published: true,
      };
      setDataResponse(data);
    }
  }, [orderInfo]);

  function handleReply() {
    if (user && dataResponse) {
      if (!reply) {
        const postOrderResponse = async () => {
          await ordersService.postResponseOrder(dataResponse, Number(id));
          return;
        };
        postOrderResponse();
        setReply(true);
      } else {
        const deleteOrderResponse = async () => {
          await ordersService.deleteResponseOrder(dataResponse, Number(id));
        };
        deleteOrderResponse();
        setReply(false);
      }
    } else {
      setReply(false);
      console.log("Здесь должен открываться попап с авторизацией");
    }
  }

  function handlePopupOpen() {
    if (user) {
      setOpenPopup(true);
    } else {
      console.log("Здесь должен открываться попап с авторизацией");
    }
  }

  function handlePopupClose() {
    setOpenPopup(false);
  }

  function handleFavourite() {
    if (isFavourite) {
      setIsFavourite(false);
      return;
    }
    setIsFavourite(true);
  }

  function handleAchive() {
    if (dataResponse) {
      const patchOrderResponse = async () => {
        await ordersService.patchResponseOrder(dataResponse, Number(id));
        return;
      };
      patchOrderResponse();
    }
  }

  // работает не корректно
  const formatDate = (dateString: string) => {
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const parts = dateString?.split(" ");
    const day = parts[1];
    const monthIndex = months.findIndex((month) => month === parts[2]);
    const year = parts[3];
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
    return formattedDate;
  };
  useEffect(() => {
    if (orderInfo?.pub_date) {
      const originalString = orderInfo?.pub_date;
      const Date = formatDate(originalString.replace("Published", ""));
      setFormattedDate(Date);
    }
  }, [orderInfo]);

  if (orderInfo) {
    return (
      <StyledEngineProvider injectFirst>
        <div
          className={
            orderInfo.applicants ? "orderPage" : "orderPage__without-designers"
          }
        >
          <div className="orderPage__card">
            <div className="orderPage__header">
              <div className="orderPage__user">
                <Avatar
                  className="orderPage__avatar"
                  src={orderInfo?.customer.photo}
                />
                <div className="orderPage__customer">
                  <Typography component="h2" className="orderPage__name">
                    {orderInfo?.customer.first_name}{" "}
                    {orderInfo?.customer.last_name}
                  </Typography>
                  <Typography component="h3" className="orderPage__post">
                    {orderInfo?.customer.post}
                  </Typography>
                </div>
              </div>
              {!myCard ? (
                <>
                  {!isFavourite ? (
                    <div className="orderPage__favourite-group">
                      <IconButton
                        aria-label="favourite"
                        onClick={handleFavourite}
                      >
                        <img
                          className="orderPage__favourite-icon"
                          src={FavouritesIconBig}
                          alt="Иконка избранное"
                        />
                      </IconButton>
                      <Typography
                        component="p"
                        className="orderPage__favourite-caption"
                      >
                        Сохранить
                      </Typography>
                    </div>
                  ) : (
                    <div className="orderPage__favourite-group">
                      <IconButton
                        aria-label="favourite"
                        onClick={handleFavourite}
                      >
                        <img
                          className="orderPage__favourite-icon"
                          src={FavouritesIconBigActive}
                          alt="Иконка избранное"
                        />
                      </IconButton>
                      <Typography
                        component="p"
                        className="orderPage__favourite-caption"
                      >
                        Сохранено
                      </Typography>
                    </div>
                  )}
                </>
              ) : null}
            </div>

            <div>
              <Typography component="h3" className="orderPage__title">
                {orderInfo?.title}
              </Typography>
              <Typography component="p" className="orderPage__price">
                {orderInfo?.payment} ₽
              </Typography>
              <Typography component="p" className="orderPage__specialization">
                Кто нужен: {customerSpecialization}
              </Typography>

              {!myCard ? (
                <div className="orderPage__buttons">
                  <MyButton
                    type="button"
                    variant="outlined"
                    size="large"
                    onClick={handlePopupOpen}
                    className="orderPage__button"
                  >
                    Написать
                  </MyButton>
                  {!customerUser && !myCard ? (
                    <>
                      {!reply ? (
                        <MyButton
                          type="button"
                          size="large"
                          onClick={handleReply}
                          className="orderPage__button"
                        >
                          Откликнуться
                        </MyButton>
                      ) : (
                        <div className="orderPage__reply-del">
                          <Typography
                            component="p"
                            className="orderPage__reply-caption"
                          >
                            Вы откликнулись
                          </Typography>
                          <MyButton
                            type="button"
                            size="large"
                            variant="text"
                            onClick={handleReply}
                            className="orderPage__button-del-reply"
                          >
                            Удалить отклик
                          </MyButton>
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
              ) : (
                <div className="orderPage__buttons">
                  <MyButton
                    type="button"
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/orders/create")}
                    className="orderPage__button"
                  >
                    Редактировать
                  </MyButton>
                  <MyButton
                    type="button"
                    variant="text"
                    size="large"
                    onClick={handleAchive}
                    className="orderPage__button-archiv"
                  >
                    Переместить в архив
                  </MyButton>
                </div>
              )}
              <Typography
                component="p"
                className="orderPage__description-title"
              >
                Описание заказа:
              </Typography>
              <Typography component="p" className="orderPage__description">
                {orderInfo?.description}
              </Typography>

              {orderInfo ? (
                <Stack
                  className={`${"caseInfo__list"}`}
                  component="ul"
                  color="secondary"
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    borderColor: (theme) => theme.palette.text.secondary,
                  }}
                >
                  <li
                    className={`${"caseInfo__list-item"}`}
                    key={orderInfo.sphere.name && orderInfo.sphere.id}
                  >
                    {orderInfo?.sphere.name}
                  </li>
                </Stack>
              ) : null}

              <Typography component="p" className="orderPage__pub">
                Дата публикации: {formattedDate}
              </Typography>
            </div>
          </div>
          {orderInfo.applicants ? (
            <div className="orderPage__designers">
              {orderInfo.applicants.length > 0 ? (
                <Box>
                  <Typography
                    component="h2"
                    className="orderPage__designers-title"
                  >
                    Отклики на заказ
                  </Typography>
                  <div className="orderPage__designers-list">
                    {orderInfo.applicants.map((item) => (
                      <RespondedDesigner
                        key={item.id}
                        designer={item}
                        handlePopupOpen={handlePopupOpen}
                      />
                    ))}
                  </div>
                </Box>
              ) : (
                <>
                  <Avatar
                    className="orderPage__empty-img"
                    src={RespondedDesignersEmpty}
                  />
                  <Typography
                    component="p"
                    className="orderPage__designers-empty"
                  >
                    Здесь появятся отклики дизайнеров, готовых работать с вами
                  </Typography>
                </>
              )}
            </div>
          ) : null}

          {openPopup ? (
            <MyMessagePopup open={openPopup} onClose={handlePopupClose} />
          ) : null}
        </div>
      </StyledEngineProvider>
    );
  } else {
    return <EmptyData title="Такого заказа нет" />;
  }
};

export default OrderPage;
