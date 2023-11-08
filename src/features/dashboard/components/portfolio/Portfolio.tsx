import Box from "@mui/material/Box";
import classes from "./Portfolio.module.scss";
import MyButton from "@/components/UI/MyButton/MyButton";
import { Grid, Typography } from "@mui/material";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={classes.portfolio}>
      {location.pathname === "/dashboard/portfolio" ? (
        <>
          <Box className={classes.portfolio__addProjectContainer}>
            <Box className={classes.portfolio__addProject} />
            <MyButton
              className={classes.portfolio__button}
              label="Добавить проект"
              onClick={() => {
                navigate("/dashboard/portfolio/create");
              }}
            />
          </Box>
          <Box className={classes.portfolio__allProjectsContainer}>
            <Typography className={classes.portfolio__heading} variant="h2">
              Опубликованные проекты
            </Typography>
            <Box className={classes.portfolio__allProjects}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
              ></Grid>
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
