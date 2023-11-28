import { Grid, Stack, StyledEngineProvider, Typography } from "@mui/material";
import "./AboutItem.scss";
import React from "react";
import { IDataItem } from "@/types";

interface IAboutItemProps {
  title: string;
  data?: IDataItem[] | string[] | string | number;
  secondary?: boolean;
}

const AboutItem: React.FC<IAboutItemProps> = ({
  data,
  title,
  secondary = false,
}) => {
  let content: React.ReactNode;

  if (typeof data === "object") {
    content = (
      <Stack
        className={`${
          secondary ? "aboutItem-secondary__list" : "aboutItem__list"
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
            key={typeof item === "string" ? item : item.id}
          >
            {typeof item === "string" ? item : item.name}
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
