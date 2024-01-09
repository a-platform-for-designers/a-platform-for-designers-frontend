import { Grid, StyledEngineProvider } from "@mui/material";
import "./Mentoring.scss";
import React from "react";
import { IMentoring } from "@/types";
import { AboutItem, EmptyData } from "..";

interface IProps {
  mentoring?: IMentoring | null;
  emptyTitle: string;
}

const Mentoring: React.FC<IProps> = ({ mentoring, emptyTitle }) => {
  if (!mentoring) return <EmptyData title={emptyTitle} />;
  const { experience, expertise, price, agreement_free, instruments, skills } =
    mentoring || {};

  console.log(mentoring);

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
        className="mentoring"
        justifyContent="space-between"
        container
        flexWrap="nowrap"
      >
        <Grid className="mentoring__main">
          <AboutItem data={experience} title="Опыт работы" />
          <AboutItem data={expertise} title="С чем могу помочь?" />
          <AboutItem
            data={
              price
                ? price.toString()
                : agreement_free
                ? "По договоренности"
                : "Бесплатно"
            }
            title="Стоимость"
          />
        </Grid>
        <Grid container className="mentoring__main" flexWrap="nowrap">
          <AboutItem data={setSkills()} title="Навыки" />
          <AboutItem data={setInstruments()} title="Инструменты" />
        </Grid>
      </Grid>
    </StyledEngineProvider>
  );
};

export default Mentoring;
