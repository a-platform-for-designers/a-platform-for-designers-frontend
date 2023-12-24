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
import { useAppSelector } from "@/hooks/reduxHooks";
import { MyMessagePopup } from "@/shared/UI";

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
    /* likes,
    followers, */
  } = data;

  const [likes, setLikes] = useState(1000);
  const [isLiked, setIsLiked] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const { isAuth } = useAppSelector((state) => state.auth);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  function handleClick() {
    if (isAuth) {
      setOpenPopup(true);
    }
  }

  function handlePopupClose() {
    setOpenPopup(false);
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
            <Typography className="info__subtitle" component="p">
              {setSpecializations()?.join(", ")}
            </Typography>
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
                    label: "Подписаться",
                    onClick: () => {
                      console.log("Подписались!");
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
                    label: "Подписаться",
                    onClick: () => {
                      console.log("Подписались!");
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
              <SocialIndicator variant="followers" count={98} />
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      {openPopup ? (
        <MyMessagePopup open={openPopup} onClose={handlePopupClose} />
      ) : null}
    </StyledEngineProvider>
  );
};

export default Info;
