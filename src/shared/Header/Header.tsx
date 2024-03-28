import AppBar from "@mui/material/AppBar";
import {
  Box,
  List,
  ListItem,
  StyledEngineProvider,
  Toolbar,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import "./Header.scss";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FollowersIcon from "../../assets/icons/FollowersIcon.svg";
import FollowersIconActive from "../../assets/icons/FollowersIconActive.svg";
import FavouritesIcon from "../../assets/icons/FavouritesDark.svg";
import MessagesIcon from "../../assets/icons/MessageBlack.svg";
import MessagesIconActive from "../../assets/icons/MessagePurple.svg";
import FavouritesIconActive from "@/assets/icons/FavouritesIconActive.svg";
import MyOrdersActive from "../../assets/icons/MyOrdersActive.svg";
import OrdersIcon from "../../assets/icons/orders.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { MyButton } from "../UI";
import { tokenManager } from "@/api/api";
import { setCurrentScreen } from "@/redux/slices/authSlice";
import { Screens } from "@/types";

const Header: React.FC = () => {
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const isAuthLoading =
    tokenManager.hasToken() && (loading === "pending" || loading === "idle");

  const myId = user?.id;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      dispatch(setCurrentScreen({ screen: Screens.None }));
    }
  }, [isAuth, dispatch]);

  function openSignInPopup() {
    dispatch(setCurrentScreen({ screen: Screens.SignIn }));
  }

  function openSignUpPopup() {
    dispatch(setCurrentScreen({ screen: Screens.SignUp }));
  }

  function handleClick() {
    navigate("/");
    window.scrollTo(0, 0);
  }

  return (
    <StyledEngineProvider injectFirst>
      <AppBar className="header" position="static">
        <Box>
          <Box className="header__container">
            <Toolbar className="header__toolbar" variant="dense">
              <Box className="header__logo" onClick={() => handleClick()} />
              <List
                className="header__pages-list"
                sx={{ flexGrow: 1, display: "flex" }}
              >
                <ListItem
                  className={`header__menu-item ${
                    location.pathname === "/designers"
                      ? "header__menu-item_active"
                      : ""
                  }`}
                  onClick={() => navigate("/designers")}
                >
                  Дизайнеры
                </ListItem>
                <ListItem
                  className={`header__menu-item ${
                    location.pathname === "/orders"
                      ? "header__menu-item_active"
                      : ""
                  }`}
                  onClick={() => navigate("/orders")}
                >
                  Заказы
                </ListItem>
                <ListItem
                  className={`header__menu-item ${
                    location.pathname === "/mentors"
                      ? "header__menu-item_active"
                      : ""
                  }`}
                  onClick={() => navigate("/mentors")}
                >
                  Менторы
                </ListItem>
              </List>
            </Toolbar>
            <Toolbar className="header__auth-buttons">
              {isAuth || isAuthLoading ? (
                <List className="header__links">
                  <ListItem
                    className="header__link"
                    onClick={() => navigate(`/subscriptions/my-subscriptions`)}
                  >
                    <img
                      className="header__list-icon"
                      src={
                        location.pathname ===
                          "/subscriptions/my-subscriptions" ||
                        location.pathname === "/subscriptions/my-followers"
                          ? FollowersIconActive
                          : FollowersIcon
                      }
                      alt="Иконка меню"
                    />
                    <p
                      className={`header__list-text ${
                        location.pathname ===
                          "/subscriptions/my-subscriptions" ||
                        location.pathname === "/subscriptions/my-followers"
                          ? "header__list-text_active"
                          : ""
                      }`}
                    >
                      Подписки
                    </p>
                  </ListItem>

                  <ListItem
                    className="header__link"
                    onClick={() => navigate(`/favourites/cases`)}
                  >
                    <img
                      className="header__list-icon"
                      src={
                        location.pathname === "/favourites/orders" ||
                        location.pathname === "/favourites/cases"
                          ? FavouritesIconActive
                          : FavouritesIcon
                      }
                      alt="Иконка меню"
                    />
                    <p
                      className={`header__list-text ${
                        location.pathname === "/favourites/orders" ||
                        location.pathname === "/favourites/cases"
                          ? "header__list-text_active"
                          : ""
                      }`}
                    >
                      Избранное
                    </p>
                  </ListItem>

                  <ListItem
                    className="header__link"
                    onClick={() => navigate(`/chats`)}
                  >
                    <img
                      className="header__list-icon"
                      src={
                        location.pathname === "/chats"
                          ? MessagesIconActive
                          : MessagesIcon
                      }
                      alt="Иконка меню"
                    />
                    <p
                      className={`header__list-text ${
                        location.pathname === "/chats"
                          ? "header__list-text_active"
                          : ""
                      }`}
                    >
                      Сообщения
                    </p>
                  </ListItem>
                  <ListItem
                    className="header__link"
                    onClick={() => navigate(`my-orders/orders`)}
                  >
                    <img
                      className="header__list-icon"
                      src={
                        location.pathname === "/my-orders/orders" ||
                        location.pathname === "/my-orders/archive"
                          ? MyOrdersActive
                          : OrdersIcon
                      }
                      alt="Иконка меню"
                    />
                    <p
                      className={`header__list-text ${
                        location.pathname === "/my-orders/orders" ||
                        location.pathname === "/my-orders/archive"
                          ? "header__list-text_active"
                          : ""
                      }`}
                    >
                      Мои&nbsp;заказы
                    </p>
                  </ListItem>
                  <Avatar
                    className="header__avatar"
                    alt="avatar"
                    src={user?.photo}
                    onClick={() => navigate(`/profile/${myId}`)}
                    sx={{ backgroundColor: "#4F378B", color: "#EADDFF" }}
                  >
                    {!user?.photo &&
                      `${user?.first_name[0]}${user?.last_name[0]}`}
                  </Avatar>
                </List>
              ) : (
                <>
                  <MyButton
                    className="header__signup-button"
                    size="small"
                    type="button"
                    variant="outlined"
                    onClick={openSignUpPopup}
                  >
                    Регистрация
                  </MyButton>
                  <MyButton
                    className="header__signin-button"
                    size="small"
                    type="button"
                    onClick={openSignInPopup}
                  >
                    Вход
                  </MyButton>
                </>
              )}
            </Toolbar>
          </Box>
        </Box>
      </AppBar>
    </StyledEngineProvider>
  );
};

export default Header;
