import { Grid, ListItem, StyledEngineProvider } from "@mui/material";
import "./WorkCategories.scss";
import React, { useEffect } from "react";
import MyButton from "@/shared/UI/MyButton/MyButton";
import { useAppSelector } from "@/hooks/reduxHooks";
import { ICase } from "@/types";
import { filterService } from "@/api/services/filterService";

// интерфейс данных категории, которые нужно передать в пропсах
export interface IWorkCategoryData {
  title: string;
  link: string;
}

// Отдельно выбирается одна категория и "Ваши подписки"
export interface IActiveWorkCategoryState {
  allDirections: boolean;
  categories: string[];
  following: boolean;
}

interface IWorkCategoriesProps {
  data: IWorkCategoryData[];
  workCategoryState: IActiveWorkCategoryState;
  setWorkCategoryState: React.Dispatch<
    React.SetStateAction<IActiveWorkCategoryState>
  >;
  setCases: React.Dispatch<React.SetStateAction<ICase[]>>;
}

/* Логика работы категорий 
  Можно выбрать «все направления» и/или «ваши подписки». 
  Если выбран "все направления", то тэги с видами дизайна не активны. 
  Можно выбрать теги с видами дизайна и ваши подписки — они суммируются. 
  Можно выбрать несколько тэгов с видами дизайна 
*/

const WorkCategories: React.FC<IWorkCategoriesProps> = ({
  data, // сами категории/тэги
  workCategoryState,
  setWorkCategoryState,
  setCases,
}) => {
  const onCategoryClickHandler = (category: IWorkCategoryData) => {
    setWorkCategoryState((prev) => {
      const categories: string[] = [];

      if (prev.categories.includes(category.title)) {
        categories.push(
          ...prev.categories.filter((title) => title !== category.title)
        );
      } else {
        categories.push(...prev.categories, category.title);
      }

      return { ...prev, allDirections: false, categories };
    });
  };

  const onAllDirectionsClickHandler = () => {
    setWorkCategoryState((prev) => ({
      ...prev,
      allDirections: !prev.allDirections,
      categories: [],
    }));
  };

  const onFollowingClickHandler = () => {
    setWorkCategoryState((prev) => ({
      ...prev,
      following: !prev.following,
    }));
  };

  // getting the initial data with the categories and ids
  const categoriesSelector = useAppSelector(
    (state) => state.data.specializations
  );

  // converting categories to ids
  const categoriesToIds = React.useCallback(
    (categories: string[]) => {
      return categories.map((key) => categoriesSelector[key]);
    },
    [categoriesSelector]
  );

  // every time the category state changes, get the list of cases and set it
  useEffect(() => {
    const currentfilters = categoriesToIds(workCategoryState.categories);

    (async () => {
      const filteredList = await filterService.getQuerySpecializations(
        currentfilters,
        12,
        1
      );

      setCases(filteredList.results);
    })();
  }, [setCases, workCategoryState.categories, categoriesToIds]);

  return (
    <StyledEngineProvider injectFirst>
      <Grid
        className="workCategories"
        justifyContent="space-between"
        container
        component="ul"
      >
        <ListItem className="workCategories__item">
          <MyButton
            active={workCategoryState.allDirections}
            size="small"
            variant="tag"
            onClick={() => onAllDirectionsClickHandler()}
          >
            Все направления
          </MyButton>
        </ListItem>
        {data.map((item, idx) => {
          return (
            <ListItem className="workCategories__item" key={idx}>
              <MyButton
                active={workCategoryState.categories.includes(item.title)}
                onClick={() => onCategoryClickHandler(item)}
                size="small"
                variant="tag"
              >
                {item.title}
              </MyButton>
            </ListItem>
          );
        })}
        <ListItem className="workCategories__item">
          <MyButton
            active={workCategoryState.following}
            size="small"
            variant="tag"
            onClick={() => onFollowingClickHandler()}
            disabled={true}
          >
            Ваши подписки
          </MyButton>
        </ListItem>
      </Grid>
    </StyledEngineProvider>
  );
};

export default WorkCategories;
