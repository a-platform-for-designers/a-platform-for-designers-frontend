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
import React from "react";
import MyButton from "../../../../components/UI/MyButton/MyButton";
import SocialIndicator from "../SocialIndicator/SocialIndicator";

const avatarStyles: SxProps<Theme> = {
  height: "212px",
  width: "212px",
  borderRadius: "50%",
};

const statusStyles: SxProps<Theme> = {
  color: (theme) => theme.palette.success.main,
};

export interface IProfileData {
  name: string;
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
    name,
    specialization,
    image,
    country,
    registrationDate,
    status,
    /* likes,
    followers, */
  } = data;

  const initials = name
    .split(" ")
    .map((word, idx) => {
      if (idx > 1) return;
      return word[0];
    })
    .join("")
    .toUpperCase();

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
            <MyButton className="info__button" label="Подписаться" />
            <MyButton
              className="info__button"
              label="Написать"
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
            <SocialIndicator />
            <SocialIndicator />
          </Grid>
        </Grid>
      </Grid>
    </StyledEngineProvider>
  );
};

export default Info;
