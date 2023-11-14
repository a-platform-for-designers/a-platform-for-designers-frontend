import {
  Container,
  Grid,
  StyledEngineProvider,
  Typography,
} from "@mui/material";
import "./Feed.scss";
import MySwiper, { ICase } from "../UI/MySwiper/MySwiper";
import WorkCategories, {
  IActiveWorkCategoryState,
  IWorkCategoryData,
} from "../WorkCategories/WorkCategories";
import { useState } from "react";
import React from "react";

// нужно определиться, какие данные приходят от бэка и что принимает MySwiper!!!
interface IProps {
  data: ICase[];
}

// Заглушка для категорий
const workCategories: IWorkCategoryData[] = [
  {
    title: "Иллюстрация",
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

const Feed: React.FC<IProps> = ({ data }) => {
  const initialState: IActiveWorkCategoryState = {
    allDirections: true,
    categories: [],
    following: false,
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
          {data.map((item) => (
            <MySwiper key={item.id} {...item} />
          ))}
        </Grid>
      </Container>
    </StyledEngineProvider>
  );
};

export default Feed;
