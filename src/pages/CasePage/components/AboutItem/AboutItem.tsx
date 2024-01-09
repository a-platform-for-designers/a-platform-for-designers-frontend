import { Grid, Stack, StyledEngineProvider, Typography } from "@mui/material";
import "./AboutItem.scss";
import React from "react";

interface IAboutItemProps {
  title: string;
  data?: string[] | string | undefined | null;
  secondary?: boolean;
  third?: boolean;
}

const AboutItem: React.FC<IAboutItemProps> = ({
  data,
  title,
  third = false,
  secondary = false,
}) => {
  let content: React.ReactNode;

  if (typeof data === "object" && data) {
    content = (
      <Stack
        className={`${
          secondary
            ? "aboutItem-secondary__list "
            : `aboutItem__list ${third ? "aboutItem-third__list" : null}`
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
                ? "aboutItem-secondary__list-item"
                : "aboutItem__list-item"
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
          secondary ? "aboutItem-secondary__text" : "aboutItem__text"
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
        className={`${secondary ? "aboutItem-secondary" : "aboutItem"}`}
        container
      >
        <Typography
          className={`${
            secondary ? "aboutItem-secondary__title" : "aboutItem__title"
          }`}
          component="h3"
          sx={{
            color: (theme) =>
              !secondary
                ? theme.palette.text.primary
                : theme.palette.action.disabled,
          }}
        >
          {title}
        </Typography>
        {content}
      </Grid>
    </StyledEngineProvider>
  );
};

export default AboutItem;
