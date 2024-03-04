import { Box, Typography } from "@mui/material";
import "../../../UserOrdersPage/components/ArchiveCard/ArchiveCard.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import deleteCardIcon from "@/assets/icons/deleteCard-button.svg";
import { IUserSubscriber } from "@/types";

interface IProps {
  user?: IUserSubscriber;
}

const UserCard: React.FC<IProps> = ({ user }) => {
  const userInfo = {
    name: `${user?.first_name} ${user?.last_name}`,
  };

  return (
    <Box className="archiveCard">
      <div className="archiveCard__user">
        {/* <Avatar className="archiveCard__avatar" src={userInfo.avatar} /> */}
        <Typography component="h2" className="archiveCard__name">
          {userInfo.name}
        </Typography>
      </div>
      {/* {Array.isArray(userInfo.specialization) && userInfo.specialization.map(item => (
        <Typography component="p" className="archiveCard__title">
          {String(item)}
        </Typography>
      ))} */}

      <div className="archiveCard__buttons">
        <MyButton
          type="button"
          variant="text"
          size="large"
          className="archiveCard__button"
        >
          Опубликовать&nbsp;снова
        </MyButton>
        <MyButton
          type="button"
          variant="text"
          size="large"
          className="archiveCard__button archiveCard__del-button"
        >
          <img src={deleteCardIcon} />
          Удалить
        </MyButton>
      </div>
    </Box>
  );
};

export default UserCard;
