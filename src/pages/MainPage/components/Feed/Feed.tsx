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
import WorkCategories from "../WorkCategories/WorkCategories";
import { IWorkCategoryData, IActiveWorkCategoryState } from "@/types";
import MySwiper from "@/shared/UI/MySwiper/MySwiper";
import { ICase } from "@/types";
import Preloader from "@/shared/Preloader/Preloader";
import MyPagination from "@/shared/UI/MyPagination/MyPagination";

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
  isLoading: boolean;
  totalCases: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalCases: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}

const Feed: React.FC<IProps> = ({
  cases,
  setCases,
  isLoading,
  totalCases,
  setPage,
  page,
  setTotalCases,
  limit,
}) => {
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
          page={page}
          setTotalCases={setTotalCases}
        />
        <Grid className="feed__list" justifyContent="center" container>
          {isLoading ? (
            <Preloader />
          ) : (
            <>
              {cases.map((item) => (
                <MySwiper
                  item={item}
                  key={item.id}
                  onClick={() => navigate(`/case/${item.id}`)}
                />
              ))}
            </>
          )}
        </Grid>
        <MyPagination
          totalCases={totalCases}
          setPage={setPage}
          page={page}
          limit={limit}
        />
      </Container>
    </StyledEngineProvider>
  );
};

export default Feed;
