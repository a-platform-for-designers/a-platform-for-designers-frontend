import { Grid, StyledEngineProvider } from "@mui/material";
import "./Work.scss";
import React from "react";
import { IResume } from "../../../../types";
import { EmptyData, AboutItem } from "..";

interface IWorkProps extends IResume {}

const Work: React.FC<IWorkProps> = ({ about, instruments, skills }) => {
  if (!about && !instruments && !skills) {
    return <EmptyData title="Дизайнер пока не указал информацию" />;
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
          <AboutItem data={skills} title="Навыки" />
          <AboutItem data={instruments} title="Инструменты" />
        </Grid>
      </Grid>
    </StyledEngineProvider>
  );
};

export default Work;
