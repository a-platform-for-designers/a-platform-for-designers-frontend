import {
  Container,
  Grid,
  StyledEngineProvider,
  Typography,
} from "@mui/material";
import "./Feed.scss";
import MySwiper from "../UI/MySwiper/MySwiper";
import WorkCategories, {
  IActiveWorkCategoryState,
  IWorkCategoryData,
} from "../WorkCategories/WorkCategories";
import { useState } from "react";
import React from "react";

// нужно определиться, какие данные приходят от бэка и что принимает MySwiper!!!
export interface IFeedData {}

interface IFeedProps {
  data: IFeedData[];
}

// Заглушка для категорий
const workCategories: IWorkCategoryData[] = [
  {
    title: "Все направления",
    link: "",
  },
  {
    title: "Иллюстратоции",
    link: "",
  },
  {
    title: "Графический дизайн",
    link: "",
  },
  {
    title: "3d визуализация",
    link: "",
  },
  {
    title: "Веб дизайн",
    link: "",
  },
];

const Feed: React.FC<IFeedProps> = ({ data }) => {
  // Изначально выбрана первая категория из переданных и подписки
  const initialState: IActiveWorkCategoryState = {
    categoryTitle: workCategories[0].title,
    following: true,
  };

  const [workCategoryState, setWorkCategoryState] =
    useState<IActiveWorkCategoryState>(initialState);

  return (
    <StyledEngineProvider injectFirst>
      <Container
        className="feed"
        component="section"
        aria-label="Лучшее на DesignCollab "
      >
        <Typography className="mainPage__title feed__title" component="h2">
          Лучшее на DesignCollab
        </Typography>
        <WorkCategories
          data={workCategories}
          workCategoryState={workCategoryState}
          setWorkCategoryState={setWorkCategoryState}
        />
        <Grid className="feed__list" justifyContent="center" container>
          {data.map((item, idx) => (
            <MySwiper key={idx} />
          ))}
        </Grid>
      </Container>
    </StyledEngineProvider>
  );
};

export default Feed;
