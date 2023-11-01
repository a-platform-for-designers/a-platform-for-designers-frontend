import { Avatar, Box, Button, Typography } from "@mui/material";
import "./DesignersCard.scss";
import MySwiper from "../UI/MySwiper/MySwiper";

interface IProps {}

const DesignersCard: React.FC<IProps> = () => {
  return (
    <Box className="designersCard">
      <div className="designersCard__info">
        <div>
          <Avatar />
          <Typography component="h2" className="designersCard__name">
            Елизавета Шарикоподшипникова
          </Typography>
          <Typography paragraph className="designersCard__job">
            Графический дизайнер
          </Typography>
          <Typography paragraph className="designersCard__country">
            Россия
          </Typography>
        </div>
        <div>
          <Button variant="outlined">Написать</Button>
        </div>
      </div>
      <MySwiper key={"asdasd11"} />
      <MySwiper key={"asdasd123"} />
    </Box>
  );
};

export default DesignersCard;
