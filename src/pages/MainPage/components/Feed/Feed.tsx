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
import { ICase } from "@/types";

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
    title: "3D-дизайн",
    link: "",
  },
  {
    title: "Веб-дизайн",
    link: "",
  },
];

interface IProps {
  cases: ICase[];
  setCases: React.Dispatch<React.SetStateAction<ICase[]>>;
}

const Feed: React.FC<IProps> = ({ cases, setCases }) => {
  const initialState: IActiveWorkCategoryState = {
    allDirections: true,
    categories: [],
    following: false,
  };
  const navigate = useNavigate();

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
          setCases={setCases}
        />
        <Grid className="feed__list" justifyContent="center" container>
          {cases.map((item) => (
            <MySwiper
              item={item}
              key={item.id}
              onClick={() => navigate(`/case/${item.id}`)}
            />
          ))}
        </Grid>
      </Container>
    </StyledEngineProvider>
  );
};

export default Feed;
