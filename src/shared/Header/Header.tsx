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
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FollowersIcon from "../../assets/icons/FollowersIcon.svg";
import FavouritesIcon from "../../assets/icons/FavouritesDark.svg";
import MessagesIcon from "../../assets/icons/MessageBlack.svg";
import MessagesIconActive from "../../assets/icons/MessagePurple.svg";
import MyOrdersActive from "../../assets/icons/MyOrdersActive.svg";
import OrdersIcon from "../../assets/icons/orders.svg";
import { useAppSelector } from "@/hooks/reduxHooks";
import { MyAuthForm, MyButton, MyPopup } from "../UI";
import SignIn from "../SignIn/SignIn";
import UserRole from "../UserRole/UserRole";
import SignUp from "../SignUp/SignUp";

const Header: React.FC = () => {
  const location = useLocation();
  const [isOpenSignIn, setIsOpenSignIn] = useState<boolean>(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState<boolean>(false);
  const [isRoleSelected, setIsRoleSelected] = useState<boolean>(false);
  const [isCustomer, setIsCustomer] = useState<boolean>(true);
  const { isAuth } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);

  const myId = user?.id;

  const navigate = useNavigate();

  function chooseCustomerRole() {
    setIsRoleSelected(true);
    setIsCustomer(true);
  }

  function chooseDesignerRole() {
    setIsRoleSelected(true);
    setIsCustomer(false);
  }

  useEffect(() => {
    isAuth && handleClose(), [isAuth];
  });

  function handleClose() {
    setIsOpenSignIn(false);
    setIsOpenSignUp(false);
    setIsRoleSelected(false);
  }

  function openSignInPopup() {
    handleClose();
    setIsOpenSignIn(true);
  }

  function openSignUpPopup() {
    handleClose();
    setIsOpenSignUp(true);
  }

  function handleCkick() {
    navigate("/");
    window.scrollTo(0, 0);
  }

  return (
    <StyledEngineProvider injectFirst>
      <AppBar className="header" position="static">
        <Box>
          <Box className="header__container">
            <Toolbar className="header__toolbar" variant="dense">
              <Box className="header__logo" onClick={() => handleCkick()} />
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
                  //! onClick={() => navigate("/mentors")}
                >
                  Менторы
                </ListItem>
              </List>
            </Toolbar>
            <Toolbar className="header__auth-buttons">
              {isAuth ? (
                <List className="header__links">
                  <ListItem className="header__link">
                    <img
                      className="header__list-icon"
                      src={FollowersIcon}
                      alt="Иконка меню"
                    />
                    <p className="header__list-text">Подписки</p>
                  </ListItem>
                  <ListItem className="header__link">
                    <img
                      className="header__list-icon"
                      src={FavouritesIcon}
                      alt="Иконка меню"
                    />
                    <p className="header__list-text">Избранное</p>
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

      <MyPopup onClose={handleClose} open={isOpenSignIn}>
        <MyAuthForm title="Вход">
          <SignIn openSignUpPopup={openSignUpPopup} />
        </MyAuthForm>
      </MyPopup>

      <MyPopup onClose={handleClose} open={isOpenSignUp}>
        {isRoleSelected === false ? (
          <UserRole
            onChooseDesignerRole={chooseDesignerRole}
            onChooseCustomerRole={chooseCustomerRole}
          />
        ) : (
          <MyAuthForm title="Регистрация">
            <SignUp openSignInPopup={openSignInPopup} isCustomer={isCustomer} />
          </MyAuthForm>
        )}
      </MyPopup>
    </StyledEngineProvider>
  );
};

export default Header;
