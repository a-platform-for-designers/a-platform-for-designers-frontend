import { Grid, ListItem, StyledEngineProvider } from "@mui/material";
import "./WorkCategories.scss";
import React from "react";
import MyButton from "../UI/MyButton/MyButton";

// интерфейс данных категории, которые нужно передать в пропсах
export interface IWorkCategoryData {
  title: string;
  link: string;
}

// Отдельно выбирается одна категория и "Ваши подписки"
export interface IActiveWorkCategoryState {
  categoryTitle: string;
  following: boolean;
}

interface IWorkCategoriesProps {
  data: IWorkCategoryData[];
  workCategoryState: IActiveWorkCategoryState;
  setWorkCategoryState: React.Dispatch<
    React.SetStateAction<IActiveWorkCategoryState>
  >;
}

const WorkCategories: React.FC<IWorkCategoriesProps> = ({
  data,
  workCategoryState,
  setWorkCategoryState,
}) => {
  const onCategoryClickHandler = (category: IWorkCategoryData) => {
    console.dir("click in Work Categories component ");
    console.dir(category);

    setWorkCategoryState((prev) => ({
      ...prev,
      categoryTitle: category.title,
    }));
  };

  const onFollowingClickHandler = () => {
    console.dir("click in Work Categories component ");

    setWorkCategoryState((prev) => ({ ...prev, following: !prev.following }));
  };

  return (
    <StyledEngineProvider injectFirst>
      <Grid
        className="workCategories"
        justifyContent="space-between"
        container
        component="ul"
      >
        {data.map((item, idx) => {
          return (
            <ListItem className="workCategories__item" key={idx}>
              <MyButton
                active={workCategoryState.categoryTitle === item.title}
                label={item.title}
                onClick={() => onCategoryClickHandler(item)}
                size="small"
                variant="tag"
              />
            </ListItem>
          );
        })}
        <ListItem className="workCategories__item">
          <MyButton
            active={workCategoryState.following}
            size="small"
            variant="tag"
            onClick={() => onFollowingClickHandler()}
            label={"Ваши подписки"}
          />
        </ListItem>
      </Grid>
    </StyledEngineProvider>
  );
};

export default WorkCategories;
