import { Grid, StyledEngineProvider } from "@mui/material";
import "./Profile.scss";
import React from "react";
import { IProfileDesigner } from "../../../../types";
import { AboutItem, EmptyData } from "..";

interface IProps {
  profiledesigner?: IProfileDesigner | null;
}

const Profile: React.FC<IProps> = ({ profiledesigner }) => {
  if (!profiledesigner)
    return <EmptyData title="Дизайнер пока не заполнил профиль" />;
  const { education, country, hobby, language, specialization } =
    profiledesigner;

  function setSpecializations() {
    if (Array.isArray(specialization)) {
      const name: string = "name";
      const result = specialization.map((obj) =>
        String(obj[name as keyof typeof obj])
      );
      return result;
    }
  }

  function setLanguages() {
    if (Array.isArray(language)) {
      const name: string = "name";
      const result = language.map((obj) =>
        String(obj[name as keyof typeof obj])
      );
      return result;
    }
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
            data={setSpecializations()}
            title="Специализация"
          />
          <AboutItem secondary data={country} title="Страна" />
          <AboutItem secondary data={education} title="Образование" />
          <AboutItem secondary data={setLanguages()} title="Знание языков" />
        </Grid>
      </Grid>
    </StyledEngineProvider>
  );
};

export default Profile;
