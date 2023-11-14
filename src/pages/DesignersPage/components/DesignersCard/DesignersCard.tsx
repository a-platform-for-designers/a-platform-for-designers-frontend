import { Avatar, Box, Typography } from "@mui/material";
import "./DesignersCard.scss";
import MySwiper, { ICase } from "../../../../components/UI/MySwiper/MySwiper";
import MyButton from "../../../../components/UI/MyButton/MyButton";

const DesignersCard: React.FC<ICase> = ({
  id,
  title,
  author,
  avatar,
  images,
}) => {
  return (
    <Box className="designersCard">
      <div className="designersCard__info">
        <div>
          <Avatar className="designersCard__avatar" src={avatar} />
          <Typography component="h2" className="designersCard__name">
            {author}
          </Typography>
          <Typography paragraph className="designersCard__job">
            Графический дизайнер
          </Typography>
          <Typography paragraph className="designersCard__country">
            Россия
          </Typography>
        </div>
        <div>
          <MyButton
            variant="outlined"
            label="Написать"
            onClick={() => {}}
          ></MyButton>
        </div>
      </div>
      <MySwiper
        id={id}
        title={title}
        author={author}
        avatar={avatar}
        images={images}
      />
      <MySwiper
        id={id}
        title={title}
        author={author}
        avatar={avatar}
        images={images}
      />
    </Box>
  );
};

export default DesignersCard;
