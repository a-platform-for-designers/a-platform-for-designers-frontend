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
import MessagesIcon from "../../assets/icons/MessagesIcon.svg";
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
  const { isAuth } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);

  const myId = user?.id;

  const navigate = useNavigate();

  function chooseRole() {
    setIsRoleSelected(true);
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

  return (
    <StyledEngineProvider injectFirst>
      <AppBar className="header" position="static">
        <Box>
          <Box className="header__container">
            <Toolbar className="header__toolbar" variant="dense">
              <Box className="header__logo" onClick={() => navigate("/")} />
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
                >
                  Заказы
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
                  <ListItem className="header__link">
                    <img
                      className="header__list-icon"
                      src={MessagesIcon}
                      alt="Иконка меню"
                    />
                    <p className="header__list-text">Сообщения</p>
                  </ListItem>
                  <Avatar
                    className="header__avatar"
                    alt="avatar"
                    src={user?.photo}
                    onClick={() => navigate(`/profile/${myId}`)}
                    sx={{ backgroundColor: "#4F378B", color: "#EADDFF" }} //! Убрать хардкод
                  >{`${user?.first_name[0]}${user?.last_name[0]}`}</Avatar>
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
          <SignIn openSignUpPopup={openSignUpPopup} onClose={handleClose} />
        </MyAuthForm>
      </MyPopup>
      <MyPopup onClose={handleClose} open={isOpenSignUp}>
        {isRoleSelected === false ? (
          <UserRole onClick={chooseRole} />
        ) : (
          <MyAuthForm title="Регистрация">
            <SignUp openSignInPopup={openSignInPopup} onClose={handleClose} />
          </MyAuthForm>
        )}
      </MyPopup>
    </StyledEngineProvider>
  );
};

export default Header;
