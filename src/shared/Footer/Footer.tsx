import { Box, List, ListItem, StyledEngineProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Footer.scss";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  function handleCkick() {
    navigate("/");
    window.scrollTo(0, 0);
  }

  return (
    <StyledEngineProvider injectFirst>
      <footer className="footer">
        <Box className="footer__container">
          <Box className="footer__logo" onClick={() => handleCkick()}></Box>
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
