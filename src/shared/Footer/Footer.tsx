import {
  Box,
  List,
  ListItem,
  StyledEngineProvider,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Footer.scss";
import usePopUp from "@/hooks/usePopUp";
import TechnicalSupport from "../UI/TechnicalSupport/TechnicalSupport";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  function handleCkick() {
    navigate("/");
    window.scrollTo(0, 0);
  }
  const { openPopUp, closePopUp, PopUpWrapper } = usePopUp();

  return (
    <StyledEngineProvider injectFirst>
      <footer className="footer">
        <Box className="footer__container">
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "auto",
            }}
          >
            <Box className="footer__logo" onClick={() => handleCkick()}></Box>
            <Box
              className="footer__tech-support"
              onClick={openPopUp}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                color: "#6900ee",
                marginLeft: "15px",
              }}
            >
              <LiveHelpOutlinedIcon sx={{ marginRight: 1 }} />
              Поддержка
            </Box>
          </Container>
          <List className="footer__links">
            <ListItem className="footer__link">Правила пользования</ListItem>
            <ListItem className="footer__link">
              Политика конфиденциальности
            </ListItem>
            <ListItem className="footer__link">Юридическая информация</ListItem>
          </List>
        </Box>
        <PopUpWrapper>
          <TechnicalSupport onClose={closePopUp} />
        </PopUpWrapper>
      </footer>
    </StyledEngineProvider>
  );
};

export default Footer;
