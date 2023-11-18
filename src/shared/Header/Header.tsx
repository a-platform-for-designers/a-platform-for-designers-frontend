import AppBar from "@mui/material/AppBar";
import {
  Box,
  InputAdornment,
  List,
  ListItem,
  StyledEngineProvider,
  TextField,
  Toolbar,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.scss";
import React, { useState } from "react";
import MyButton from "../UI/MyButton/MyButton";
import { useLocation, useNavigate } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import UserRole from "../UserRole/UserRole";
import MyPopup from "../UI/MyPopup/MyPopup";
import MyAuthForm from "../UI/MyAuthForm/MyAuthForm";
import MyCheckBox from "../UI/MyCheckBox/MyCheckBox";
import FollowersIcon from "../../assets/icons/FollowersIcon.svg";
import FavouritesIcon from "../../assets/icons/FavouritesDark.svg";
import MessagesIcon from "../../assets/icons/MessagesIcon.svg";

const Header: React.FC = () => {
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);
  const [isOpenSignIn, setIsOpenSignIn] = useState<boolean>(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState<boolean>(false);
  const [isRoleSelected, setIsRoleSelected] = useState<boolean>(false);
  const myId = 1;

  const navigate = useNavigate();

  function chooseRole() {
    setIsRoleSelected(true);
  }

  function handleLogin() {
    setIsAuth(!isAuth);
  }

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
              <TextField
                className="header__search-form"
                label=""
                value="Ваш запрос"
                id="outlined-start-adornment"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                disabled
              />
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
                    src="https://www.iguides.ru/upload/medialibrary/74f/zwzgzu9t64a91p80nooe639e3bvgi18e.jpg"
                    onClick={() => navigate(`/profile/${myId}`)}
                  />
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

            {/* Чекбокс смены состояния header'a */}
            <MyCheckBox
              className="header__checkbox"
              labelPlacement="start"
              checked={isAuth}
              label="Войти"
              onChange={() => {
                handleLogin();
              }}
              disabled={false}
            />
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
