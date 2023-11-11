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
import React, { useState } from "react";
import { InfoAction, SocialIndicator } from "..";
import { getInitials } from "../../../../utils";
import { useNavigate } from "react-router-dom";

const avatarStyles: SxProps<Theme> = {
  height: "212px",
  width: "212px",
  borderRadius: "50%",
};

const statusStyles: SxProps<Theme> = {
  color: (theme) => theme.palette.success.main,
};

export interface IProfileData {
  first_name: string;
  last_name: string;
  specialization: string;
  image?: string;
  country: string;
  registrationDate: string;
  status: string;
  likes: number;
  followers: number;
}

interface IInfoProps {
  data: IProfileData;
}

const Info: React.FC<IInfoProps> = ({ data }) => {
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

  const name = `${first_name} ${last_name}`;

  const initials = getInitials(name);

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
              <Typography sx={statusStyles} className="info__status">
                {status}
              </Typography>
            </Grid>
            <Typography className="info__subtitle" component="p">
              {specialization}
            </Typography>
            <Typography className="info__subtitle" component="p">
              {country}
            </Typography>
          </Grid>
          <Grid container gap="24px">
            <InfoAction
              isCurrentUser={isCurrentUser}
              ifTrue={{
                label: "Добавить проект",
                onClick: () => {
                  setIsCurrentUser(!isCurrentUser);
                },
              }}
              ifFalse={{
                label: "Подписаться",
                onClick: () => {
                  setIsCurrentUser(!isCurrentUser);
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
                  setIsCurrentUser(!isCurrentUser);
                },
              }}
              variant="outlined"
            />
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
        </Grid>
      </Grid>
    </StyledEngineProvider>
  );
};

export default Info;
