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
import SearchIcon from "@mui/icons-material/Search";
import "./Header.scss";
import React, { useState } from "react";
import MyButton from "../UI/MyButton/MyButton";
import { useLocation } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import MyPopup from "../UI/MyPopup/MyPopup";
import MyAuthForm from "../UI/MyAuthForm/MyAuthForm";

const Header: React.FC = () => {
  const location = useLocation();
  const [isOpenSignIn, setIsOpenSignIn] = useState<boolean>(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState<boolean>(false);

  function openSignInPopup() {
    setIsOpenSignIn(true);
  }

  function openSignUpPopup() {
    setIsOpenSignUp(true);
  }

  function handleClose() {
    setIsOpenSignIn(false);
    setIsOpenSignUp(false);
  }

  return (
    <StyledEngineProvider injectFirst>
      <AppBar className="Header" position="static">
        <Toolbar className="Header__toolbar" variant="dense">
          <Box className="Header__logo"></Box>
          <TextField
            className="Header__search-form"
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
            className="Header__pages-list"
            sx={{ flexGrow: 1, display: "flex" }}
          >
            <ListItem
              className={`Header__menu-item ${
                location.pathname === "/designers"
                  ? "Header__menu-item_active"
                  : ""
              }`}
            >
              Дизайнеры
            </ListItem>
            <ListItem
              className={`Header__menu-item ${
                location.pathname === "/orders"
                  ? "Header__menu-item_active"
                  : ""
              }`}
            >
              Заказы
            </ListItem>
          </List>
        </Toolbar>
        <Toolbar className="Header__auth-buttons">
          <MyButton
            className="Header__signup-button"
            size="small"
            label="Регистрация"
            type="button"
            variant="outlined"
            onClick={openSignUpPopup}
          />
          <MyButton
            className="Header__signin-button"
            size="small"
            label="Вход"
            type="button"
            onClick={openSignInPopup}
          />
        </Toolbar>
      </AppBar>
      <MyPopup onClose={handleClose} open={isOpenSignIn}>
        <MyAuthForm title="Вход">
          <SignIn></SignIn>
        </MyAuthForm>
      </MyPopup>
      <MyPopup onClose={handleClose} open={isOpenSignUp}>
        <MyAuthForm title="Регистрация">
          <SignUp></SignUp>
        </MyAuthForm>
      </MyPopup>
    </StyledEngineProvider>
  );
};

export default Header;
