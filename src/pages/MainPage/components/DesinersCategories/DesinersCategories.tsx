import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  StyledEngineProvider,
  Typography,
} from "@mui/material";
import "./DesinersCategories.scss";
import { useNavigate } from "react-router-dom";
import { IDesinerCategoriesData } from "@/types";

interface IDesinersCategoriesProps {
  data: IDesinerCategoriesData[];
}

const DesinersCategories: React.FC<IDesinersCategoriesProps> = ({ data }) => {
  const navigate = useNavigate();

  const onClickHandler: React.MouseEventHandler = () => {
    navigate("/designers");
  };

  return (
    <StyledEngineProvider injectFirst>
      <Container
        className="desinersCategories"
        component="section"
        aria-label="Дизайнеры "
      >
        <Typography
          className="mainPage__title desinersCategories__title"
          component="h2"
        >
          Какие специалисты вам интересны?
        </Typography>
        <Grid
          className="desinersCategories__list"
          justifyContent="center"
          container
          component="ul"
        >
          {data.map((item, idx) => {
            return (
              <Card
                key={idx}
                className="desinersCategories-item"
                onClick={onClickHandler}
              >
                <CardContent className="desinersCategories-item__content">
                  <Typography className="desinersCategories-item__title">
                    {item.title}
                    <svg
                      className="desinersCategories-item__arrow"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path d="M16.01 11H4V13H16.01V16L20 12L16.01 8V11Z" />
                    </svg>
                  </Typography>
                </CardContent>
                <CardMedia
                  className="desinersCategories-item__image"
                  component="img"
                  image={item.image}
                  alt={item.title}
                />
              </Card>
            );
          })}
        </Grid>
      </Container>
    </StyledEngineProvider>
  );
};

export default DesinersCategories;
