import Box from "@mui/material/Box";
import classes from "./Portfolio.module.scss";
import { Grid, Typography } from "@mui/material";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import MyButton from "@/shared/UI/MyButton/MyButton";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import MyOptimizedImage from "@/shared/UI/MyOptimizedImage/MyOptimizedImage";
import caseCart from "@/assets/images/caseCart.webp";
import { BASE_PATH } from "@/constants/constants";
import { casesService } from "@/api";
import { getInfoAboutMe } from "@/redux/slices/userSlice";
import { useEffect } from "react";

const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocation = location.pathname;
  console.log(currentLocation);

  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // Необходимо, чтобы при возвращении назад на страницу с портфолио компонент ре-рендерился
  useEffect(() => {
    dispatch(getInfoAboutMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation]);

  const handleDelete = async (id: number) => {
    // Обсудить с беком возвращённое тело по этому запросу (сейчас ничего не приходит)
    await casesService.deleteCase(id);
    dispatch(getInfoAboutMe());
  };

  return (
    <div className={classes.portfolio}>
      {location.pathname === "/dashboard/portfolio" ? (
        <>
          <Box className={classes.portfolio__addProjectContainer}>
            <Box className={classes.portfolio__addProject} />
            <MyButton
              className={classes.portfolio__button}
              onClick={() => {
                navigate("/dashboard/portfolio/create");
              }}
            >
              Добавить проект
            </MyButton>
          </Box>
          <Box className={classes.portfolio__allProjectsContainer}>
            <Typography className={classes.portfolio__heading} variant="h2">
              Опубликованные проекты
            </Typography>
            <Box className={classes.portfolio__allProjects}>
              <Grid
                columns={2}
                gap={3}
                container
                justifyContent="center"
                alignItems="center"
              >
                {user?.portfolio.map((item) => (
                  <div key={item.id}>
                    <MyOptimizedImage
                      imageUrl={`${
                        !item.avatar && item.avatar === null
                          ? caseCart
                          : BASE_PATH + item.avatar
                      }`}
                      alt="Картинка из проекта"
                      className="portfolio__image"
                      width={660}
                      height={480}
                      format="webp"
                      maxAge="7d"
                      onClick={() => navigate(`/case/${item.id}`)}
                    />
                    <div className={classes.portfolio__btns}>
                      <button className={classes.portfolio__btn}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M2.99805 17.25V21H6.74805L17.808 9.94L14.058 6.19L2.99805 17.25ZM5.91805 19H4.99805V18.08L14.058 9.02L14.978 9.94L5.91805 19ZM20.708 5.63L18.368 3.29C18.168 3.09 17.918 3 17.658 3C17.398 3 17.148 3.1 16.958 3.29L15.128 5.12L18.878 8.87L20.708 7.04C21.098 6.65 21.098 6.02 20.708 5.63Z"
                            fill="black"
                          />
                        </svg>
                        <span>Редактировать</span>
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                        className={classes.portfolio__btn}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                            fill="#B3261E"
                          />
                        </svg>
                        <span className={classes.portfolio__btn_delete}>
                          Удалить
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </Grid>
            </Box>
          </Box>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Portfolio;
