import {
  Container,
  Grid,
  StyledEngineProvider,
  Typography,
} from "@mui/material";
import "./Feed.scss";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import WorkCategories, {
  IActiveWorkCategoryState,
  IWorkCategoryData,
} from "../WorkCategories/WorkCategories";
import MySwiper from "@/shared/UI/MySwiper/MySwiper";

// нужно определиться, какие данные приходят от бэка и что принимает MySwiper!!!
export interface IFeedData {}

interface IFeedProps {
  data: IFeedData[];
}

// Заглушка для категорий
const workCategories: IWorkCategoryData[] = [
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
  const initialState: IActiveWorkCategoryState = {
    allDirections: true,
    categories: [],
    following: false,
  };

  const navigate = useNavigate();

  const id = 1; //! Поменять на входящий
  function handleClickCase() {
    navigate(`/case/${id}`);
  }

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
          {data.map((_, idx) => (
            <MySwiper key={idx} onClick={handleClickCase} />
          ))}
        </Grid>
      </Container>
    </StyledEngineProvider>
  );
};

export default Feed;
