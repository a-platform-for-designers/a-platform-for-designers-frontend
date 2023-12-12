import {
  Avatar,
  Grid,
  Paper,
  StyledEngineProvider,
  Typography,
} from "@mui/material";
import "./ProfileInfo.scss";
import React from "react";
import { getInitials } from "../../../../features";
import { IAuthorCase } from "@/types";
import { useNavigate } from "react-router-dom";

interface IProfileInfoProps {
  data: IAuthorCase;
}

const ProfileInfo: React.FC<IProfileInfoProps> = ({ data }) => {
  const navigate = useNavigate();
  const { first_name, last_name, specialization, photo } = data;

  const name = `${first_name} ${last_name}`;

  const initials = getInitials(name);

  function setSpecializations() {
    if (Array.isArray(specialization)) {
      const name: string = "name";
      const result = specialization.map((obj) =>
        String(obj[name as keyof typeof obj])
      );
      return result;
    }
  }

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
        <Avatar
          src={photo}
          alt={name}
          className="profileInfo__avatar"
          onClick={() => {
            navigate(`/profile/${data.id}/`);
          }}
        >
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
              {setSpecializations() && setSpecializations()?.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </StyledEngineProvider>
  );
};

export default ProfileInfo;
