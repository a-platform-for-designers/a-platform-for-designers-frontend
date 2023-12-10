import { Avatar, Box, Typography } from "@mui/material";
import "./DesignersCard.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import MySwiper from "@/shared/UI/MySwiper/MySwiper";
import { IUserWithLastCases } from "@/types";
import { LISTS } from "@/constants/constants";

interface IProps {
  user: IUserWithLastCases;
}

const DesignersCard: React.FC<IProps> = ({ user }) => {
  return (
    <Box className="designersCard">
      <div className="designersCard__info">
        <div>
          <Avatar className="designersCard__avatar" src={user.photo} />
          <Typography component="h2" className="designersCard__name">
            {user.first_name} {user.last_name}
          </Typography>
          <Typography paragraph className="designersCard__job">
            {LISTS.LIST_SPECIALITY[user.specialization]}
          </Typography>
          <Typography paragraph className="designersCard__country">
            {user.profiledesigner?.country}
          </Typography>
        </div>
        <div>
          <MyButton variant="outlined" onClick={() => {}}>
            Написать
          </MyButton>
        </div>
      </div>
      {user.last_cases.map((item) => (
        <MySwiper key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default DesignersCard;
