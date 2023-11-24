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
import { getInitials } from "../../../../features";
import { IAuthorCase } from "@/types";
import { LISTS } from "@/constants/constants";

const avatarStyles: SxProps<Theme> = {
  height: "94px",
  width: "94px",
  borderRadius: "50%",
};

interface IProfileInfoProps {
  data: IAuthorCase;
}

const ProfileInfo: React.FC<IProfileInfoProps> = ({ data }) => {
  const { first_name, last_name, specialization, photo } = data;

  const name = `${first_name} ${last_name}`;

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
        <Avatar src={photo} alt={name} sx={avatarStyles}>
          {!photo ? initials : ""}
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
                {first_name}
              </Typography>
              <Typography className="profileInfo__title-item" component="span">
                {last_name}
              </Typography>
            </Grid>
            <Typography className="profileInfo__subtitle" component="p">
              {LISTS.LIST_SPECIALITY[specialization]}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </StyledEngineProvider>
  );
};

export default ProfileInfo;
