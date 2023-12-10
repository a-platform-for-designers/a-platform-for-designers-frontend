import { Grid, StyledEngineProvider } from "@mui/material";
import "./Work.scss";
import React from "react";
import { IResume } from "../../../../types";
import { EmptyData, AboutItem } from "..";

interface IProps {
  resume?: IResume;
}

const Work: React.FC<IProps> = ({ resume }) => {
  if (!resume) return <EmptyData title="Дизайнер пока не указал информацию" />;
  const { about, instruments, skills } = resume;

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
        className="work"
        justifyContent="space-between"
        container
        flexWrap="nowrap"
      >
        <Grid className="work__main">
          <AboutItem data={about} title="О себе" />
        </Grid>
        <Grid container className="work__aside">
          <AboutItem data={setSkills()} title="Навыки" />
          <AboutItem data={setInstruments()} title="Инструменты" />
        </Grid>
      </Grid>
    </StyledEngineProvider>
  );
};

export default Work;
