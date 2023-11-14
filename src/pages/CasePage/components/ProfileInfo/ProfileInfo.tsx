import {
  Avatar,
  Grid,
  Paper,
  StyledEngineProvider,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import "./ProfileInfo.scss";
import React from "react";
import { IProfileData } from "../../../ProfilePage/components/Info/Info";
import { getInitials } from "../../../../utils";

const avatarStyles: SxProps<Theme> = {
  height: "94px",
  width: "94px",
  borderRadius: "50%",
};

interface IProfileInfoProps {
  data: IProfileData;
}

const ProfileInfo: React.FC<IProfileInfoProps> = ({ data }) => {
  const { firstName, lastName, specialization, avatar } = data;

  const name = `${firstName} ${lastName}`;

  const initials = getInitials(name);

  return (
    <StyledEngineProvider injectFirst>
      <Grid
        className="profileInfo"
        container
        gap="24px"
        wrap="nowrap"
        alignItems="center"
        component={Paper}
      >
        <Avatar src={avatar} alt={name} sx={avatarStyles}>
          {!avatar ? initials : ""}
        </Avatar>
        <Grid container flexDirection="column" gap="24px" flexGrow={1}>
          <Grid container flexDirection="column" gap="12px">
            <Grid
              container
              wrap="wrap"
              flexDirection="column"
              component="h2"
              className="profileInfo__title"
            >
              <Typography className="profileInfo__title-item" component="span">
                {firstName}
              </Typography>
              <Typography className="profileInfo__title-item" component="span">
                {lastName}
              </Typography>
            </Grid>
            <Typography className="profileInfo__subtitle" component="p">
              {specialization}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </StyledEngineProvider>
  );
};

export default ProfileInfo;
