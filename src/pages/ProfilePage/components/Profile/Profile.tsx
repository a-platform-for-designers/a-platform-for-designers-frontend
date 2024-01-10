import { Grid, StyledEngineProvider } from "@mui/material";
import "./Profile.scss";
import React from "react";
import { IProfileDesignerPost } from "../../../../types";
import { AboutItem, EmptyData } from "..";

interface IProps {
  profiledesigner?: IProfileDesignerPost | null;
  emptyTitle: string;
}

const Profile: React.FC<IProps> = ({ profiledesigner, emptyTitle }) => {
  if (!profiledesigner) return <EmptyData title={emptyTitle} />;
  const {
    education,
    country,
    language,
    specialization,
    about,
    instruments,
    skills,
  } = profiledesigner || {};

  console.log(profiledesigner);

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

  function setSkills() {
    if (Array.isArray(skills)) {
      const name: string = "name";
      const result = skills.map((obj) => String(obj[name as keyof typeof obj]));
      return result;
    }
  }

  function setInstruments() {
    if (Array.isArray(instruments)) {
      const name: string = "name";
      const result = instruments.map((obj) =>
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
          <AboutItem data={about} title="О себе" />
          <AboutItem data={setSkills()} title="Навыки" />
          <AboutItem data={setInstruments()} title="Инструменты" />
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
