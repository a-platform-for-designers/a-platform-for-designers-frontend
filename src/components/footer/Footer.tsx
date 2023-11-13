import { Box, List, ListItem, StyledEngineProvider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import "./Footer.scss";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleOnClick() {
    if (pathname !== "/") navigate("/");
    scrollTo(0, 0);
  }

  return (
    <StyledEngineProvider injectFirst>
      <footer className="footer">
        <Box className="footer__container">
          <Box className="footer__logo" onClick={handleOnClick}></Box>
          <List className="footer__links">
            <ListItem className="footer__link">Правила пользования</ListItem>
            <ListItem className="footer__link">
              Политика конфиденциальности
            </ListItem>
            <ListItem className="footer__link">Юридическая информация</ListItem>
          </List>
        </Box>
      </footer>
    </StyledEngineProvider>
  );
};

export default Footer;
