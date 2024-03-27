import {
  Avatar,
  Grid,
  Paper,
  StyledEngineProvider,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import "./Info.scss";
import React, { useEffect, useState } from "react";
import { InfoAction, SocialIndicator } from "..";
import { getInitials } from "../../../../features";
import { useNavigate } from "react-router-dom";
import { IUser, IProfileData } from "@/types";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { showMessagePopUp } from "@/redux/slices/chatSlice";
import MySignInPopup from "@/shared/UI/MySignInPopup/MySignInPopup";
import subscriptionService from "@/api/services/subscriptionservice";

const avatarStyles: SxProps<Theme> = {
  height: "212px",
  width: "212px",
  borderRadius: "50%",
  fontSize: "70px",
  backgroundColor: "#4F378B",
  color: "#EADDFF",
};

const statusStyles: SxProps<Theme> = {
  color: (theme) => theme.palette.success.main,
};

interface IInfoProps {
  data: IProfileData;
  currentUser?: IUser;
}

const Info: React.FC<IInfoProps> = ({ data, currentUser }) => {
  const {
    first_name,
    last_name,
    specialization,
    image,
    country,
    registrationDate,
    status,
    post,
    /* likes,
    followers, */
  } = data;
  const [likes, setLikes] = useState(1000);
  const [isLiked, setIsLiked] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [openSignInPopup, setOpenSignInPopup] = useState<boolean>(false);
  const [subscribed, setSubscribed] = useState<boolean>(
    currentUser!.is_subscribed
  );
  const [followers, setFollowers] = useState<number>(0);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    subscriptionService
      .getFollowersById(currentUser!.id)
      .then((followers) => setFollowers(followers.subscribers_count));
  }, [currentUser]);

  function handleClick() {
    if (user) {
      dispatch(showMessagePopUp(currentUser));
    } else {
      setOpenSignInPopup(true);
    }
  }
  const isCustomer = currentUser?.is_customer;

  useEffect(() => {
    if (!user) return;
    if (user.id === currentUser?.id) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
  }, [user, currentUser]);

  const name = `${first_name} ${last_name}`;

  const initials = getInitials(name);

  function setSpecializations() {
    const name: string = "name";
    return specialization?.map((obj) => obj[name as keyof typeof obj]);
  }

  async function toggleSubscribe() {
    if (subscribed) {
      await subscriptionService.deleteSubscription(currentUser!.id);
      setFollowers(followers - 1);
    } else {
      await subscriptionService.postSubscription(currentUser!.id);
      setFollowers(followers + 1);
    }
    setSubscribed(!subscribed);
  }

  return (
    <StyledEngineProvider injectFirst>
      <Grid
        className="info"
        container
        gap="24px"
        wrap="nowrap"
        component={Paper}
      >
        <Avatar src={image} alt={name} sx={avatarStyles}>
          {!image ? initials : ""}
        </Avatar>
        <Grid container flexDirection="column" gap="24px" flexGrow={1}>
          <Grid container flexDirection="column" gap="16px">
            <Grid container wrap="nowrap" alignItems="center" gap="2px">
              <Typography className="info__title" component="h2">
                {name}
              </Typography>
              {!isCustomer ? (
                <Typography sx={statusStyles} className="info__status">
                  {status}
                </Typography>
              ) : null}
            </Grid>
            {!isCustomer ? (
              <Typography className="info__subtitle" component="p">
                {setSpecializations()?.join(", ")}
              </Typography>
            ) : null}
            {isCustomer ? (
              <Typography className="info__subtitle" component="p">
                {post}
              </Typography>
            ) : null}
            <Typography className="info__subtitle" component="p">
              {country}
            </Typography>
          </Grid>
          <Grid container gap="24px">
            {!isCustomer ? (
              <>
                <InfoAction
                  isCurrentUser={isCurrentUser}
                  ifTrue={{
                    label: "Добавить проект",
                    onClick: () => navigate("/dashboard/portfolio/create"),
                  }}
                  ifFalse={{
                    label: subscribed ? "Отписаться" : "Подписаться",
                    onClick: () => {
                      toggleSubscribe();
                    },
                  }}
                />
                <InfoAction
                  isCurrentUser={isCurrentUser}
                  ifTrue={{
                    label: "Редактировать профиль",
                    onClick: () => navigate("/dashboard"),
                  }}
                  ifFalse={{
                    label: "Написать",
                    onClick: () => {
                      handleClick();
                    },
                  }}
                  variant="outlined"
                />
              </>
            ) : (
              <>
                <InfoAction
                  isCurrentUser={isCurrentUser}
                  ifTrue={{
                    label: "Редактировать профиль",
                    onClick: () => navigate("/dashboard"),
                  }}
                  ifFalse={{
                    label: subscribed ? "Отписаться" : "Подписаться",
                    onClick: () => {
                      toggleSubscribe();
                    },
                  }}
                />

                <InfoAction
                  isCurrentUser={isCurrentUser}
                  ifTrue={{
                    label: "Создать заказ",
                    onClick: () => navigate("/orders/create"),
                  }}
                  ifFalse={{
                    label: "Написать",
                    onClick: () => {
                      handleClick();
                    },
                  }}
                  variant="outlined"
                />
              </>
            )}
          </Grid>
        </Grid>
        <Grid
          className="info__footer"
          container
          flexDirection="column"
          justifyContent="space-between"
          flexShrink={1}
          flexGrow={0}
        >
          <Typography className="info__reg-date">
            На&nbsp;сайте&nbsp;с&nbsp;{registrationDate}
          </Typography>
          {!isCustomer ? (
            <Grid
              container
              gap="16px"
              justifyContent="flex-end"
              flexGrow={0}
              paddingBottom="15px"
            >
              <SocialIndicator
                variant="likes"
                count={likes}
                active={isLiked}
                onClick={() => {
                  setLikes((prev) => {
                    // чисто потестить
                    if (isLiked) {
                      setIsLiked(false);
                      return --prev;
                    } else {
                      setIsLiked(true);
                      return ++prev;
                    }
                  });
                }}
              />
              <SocialIndicator variant="followers" count={followers} />
            </Grid>
          ) : (
            <Grid
              container
              gap="16px"
              justifyContent="flex-end"
              flexGrow={0}
              paddingBottom="15px"
            >
              <SocialIndicator variant="followers" count={followers} />
            </Grid>
          )}
        </Grid>
      </Grid>
      {openSignInPopup ? (
        <MySignInPopup setOpenSignInPopup={setOpenSignInPopup} />
      ) : null}
    </StyledEngineProvider>
  );
};

export default Info;
