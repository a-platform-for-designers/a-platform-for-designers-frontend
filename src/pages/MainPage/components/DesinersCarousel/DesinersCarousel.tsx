import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  StyledEngineProvider,
  Typography,
} from "@mui/material";
import "./DesinersCarousel.scss";
import { useNavigate } from "react-router-dom";

interface IDesinerCarouselData {
  name?: string;
  specialization?: string;
  image?: string;
  link: string;
}

interface IDesinersCarouselProps {
  data: IDesinerCarouselData[];
}

const DesinersCarousel: React.FC<IDesinersCarouselProps> = ({ data }) => {
  const navigate = useNavigate();

  console.log(data);

  return (
    <StyledEngineProvider injectFirst>
      <Container
        className="desinersCarousel"
        component="section"
        aria-label="Дизайнеры "
      >
        <Grid
          className="desinersCarousel__list"
          justifyContent="center"
          container
          component="ul"
        >
          {data.map((item, idx) => {
            return (
              <Card
                key={idx}
                className="desinersCarousel-item
              "
                onClick={() => {
                  navigate(item.link);
                }}
              >
                <CardMedia
                  className="desinersCarousel-item__image"
                  component="img"
                  image={item.image}
                  alt={item.name}
                />
                <CardContent className="desinersCarousel-item__content">
                  <Typography className="desinersCarousel-item__title">
                    {item.name}
                  </Typography>
                  <Typography className="desinersCarousel-item__subtitle">
                    {item.specialization}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </StyledEngineProvider>
  );
};

export default DesinersCarousel;
