import { Grid, StyledEngineProvider } from "@mui/material";
import "./Profile.scss";
import React from "react";
import { IProfileDesigner } from "../../../../types";
import { AboutItem, EmptyData } from "..";

const Profile: React.FC<IProfileDesigner> = ({
  education,
  country,
  specialization,
  hobby,
  language,
}) => {
  if (!education && !country && !specialization && !hobby && !language.length) {
    return <EmptyData title="Дизайнер пока не заполнил профиль" />;
  }

  return (
    <StyledEngineProvider injectFirst>
      <Grid
        className="profile"
        justifyContent="space-between"
        container
        flexWrap="nowrap"
      >
        <Grid className="profile__main">
          <AboutItem data={hobby} title="Хобби" />
        </Grid>
        <Grid
          container
          className="profile__aside profile__aside_secondary"
          justifyContent="flex-end"
        >
          <AboutItem
            secondary
            data={"Графический дизайнер"}
            title="Специализация"
          />
          <AboutItem secondary data={country} title="Страна" />
          <AboutItem secondary data={education} title="Образование" />
          <AboutItem secondary data={language} title="Язык" />
        </Grid>
      </Grid>
    </StyledEngineProvider>
  );
};

export default Profile;
