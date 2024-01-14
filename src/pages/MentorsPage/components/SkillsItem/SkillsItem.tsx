import { Grid, Stack, StyledEngineProvider, Typography } from "@mui/material";
import "./SkillsItem.scss";
import React from "react";

interface ISkillsItemProps {
  data?: string[] | string | undefined | null;
  secondary?: boolean;
  third?: boolean;
}

const SkillsItem: React.FC<ISkillsItemProps> = ({
  data,
  third = false,
  secondary = false,
}) => {
  let content: React.ReactNode;

  if (typeof data === "object" && data) {
    content = (
      <Stack
        className={`${
          secondary
            ? "skillsItem-secondary__list "
            : `skillsItem__list ${third ? "skillsItem-third__list" : null}`
        }`}
        component="ul"
        color="secondary"
        sx={{
          color: (theme) =>
            !secondary
              ? theme.palette.text.secondary
              : theme.palette.text.primary,
          borderColor: (theme) => theme.palette.text.secondary,
        }}
      >
        {data.map((item) => (
          <li
            className={`${
              secondary
                ? "skillsItem-secondary__list-item"
                : "skillsItem__list-item"
            }`}
            key={data.indexOf(item)}
          >
            {item}
          </li>
        ))}
      </Stack>
    );
  }

  if (typeof data === "string") {
    content = (
      <Typography
        className={`${
          secondary ? "skillsItem-secondary__text" : "skillsItem__text"
        }`}
        component="p"
      >
        {data}
      </Typography>
    );
  }

  return (
    <StyledEngineProvider injectFirst>
      <Grid
        className={`${secondary ? "skillsItem-secondary" : "skillsItem"}`}
        container
      >
        {content}
      </Grid>
    </StyledEngineProvider>
  );
};

export default SkillsItem;
