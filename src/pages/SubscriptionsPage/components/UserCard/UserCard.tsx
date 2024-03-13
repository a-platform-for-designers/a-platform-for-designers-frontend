import { Box, Typography, Avatar } from "@mui/material";
import "./UserCard.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import { IUserSubscriber } from "@/types";
import { useNavigate } from "react-router-dom";
import MySignInPopup from "@/shared/UI/MySignInPopup/MySignInPopup";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { showMessagePopUp } from "@/redux/slices/chatSlice";
import subscriptionsService from "@/api/services/subscriptionservice";

interface IProps {
  user?: IUserSubscriber;
  subscriptions: IUserSubscriber[];
  setSubscriptions: React.Dispatch<React.SetStateAction<IUserSubscriber[]>>;
}

const UserCard: React.FC<IProps> = ({
  user,
  setSubscriptions,
  subscriptions,
}) => {
  const userInfo = {
    name: `${user?.first_name} ${user?.last_name}`,
    specialization: user?.specialization,
    photo: user?.photo,
    id: user?.id,
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [openSignInPopup, setOpenSignInPopup] = useState<boolean>(false);

  function handlePopupOpen() {
    if (user) {
      dispatch(showMessagePopUp(user));
    } else {
      setOpenSignInPopup(true);
    }
  }

  function handleUnsubscribe() {
    subscriptionsService.deleteSubscription(user!.id);
    setSubscriptions(subscriptions.filter((item) => item.id !== user!.id));
  }

  return (
    <Box className="userCard">
      <div>
        {
          <Avatar
            className="userCard__avatar"
            alt="avatar"
            src={userInfo.photo}
            onClick={() => navigate(`/profile/${userInfo.id}`)}
            sx={{ backgroundColor: "#4F378B", color: "#EADDFF" }}
          >
            {!userInfo.photo && `${user?.first_name[0]}${user?.last_name[0]}`}
          </Avatar>
        }
        <Typography component="h2" className="userCard__name">
          {userInfo.name}
        </Typography>
        {Array.isArray(userInfo.specialization) &&
          userInfo.specialization.map((item, index) => (
            <Typography
              key={index}
              component="p"
              className="userCard__specialization"
            >
              {String(item.name)}
            </Typography>
          ))}
      </div>
      <div className="userCard__buttons">
        <MyButton
          type="button"
          variant="text"
          size="large"
          className="userCard__button"
          onClick={handleUnsubscribe}
        >
          Отменить подписку
        </MyButton>
        <MyButton
          type="button"
          variant="outlined"
          size="large"
          className="userCard__button userCard__button-write"
          onClick={handlePopupOpen}
        >
          Написать
        </MyButton>
      </div>
      {openSignInPopup ? (
        <MySignInPopup setOpenSignInPopup={setOpenSignInPopup} />
      ) : null}
    </Box>
  );
};

export default UserCard;
