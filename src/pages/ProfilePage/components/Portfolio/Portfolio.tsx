import { Grid, StyledEngineProvider } from "@mui/material";
import "./Portfolio.scss";
import React from "react";
import MySwiper from "../../../../components/UI/MySwiper/MySwiper";
import { EmptyData } from "..";
import { useNavigate } from "react-router-dom";

interface IPortfolioData {}

interface IPortfolioProps {
  data: IPortfolioData[];
}

const Portfolio: React.FC<IPortfolioProps> = ({ data }) => {
  const navigate = useNavigate();

  if (!data.length) {
    return <EmptyData title="У дизайнера пока нет проектов" />;
  }

  return (
    <StyledEngineProvider injectFirst>
      <Grid className="portfolio" justifyContent="center" container>
        {data.map((_, idx) => (
          <MySwiper key={idx} onClick={() => navigate("/case/1")} />
        ))}
      </Grid>
    </StyledEngineProvider>
  );
};

export default Portfolio;
