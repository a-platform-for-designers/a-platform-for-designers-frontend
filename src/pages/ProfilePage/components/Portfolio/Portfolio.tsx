import { Grid, StyledEngineProvider } from "@mui/material";
import "./Portfolio.scss";
import React from "react";
import MySwiper from "../../../../components/UI/MySwiper/MySwiper";
import { EmptyData } from "..";

interface IPortfolioData {}

interface IPortfolioProps {
  data: IPortfolioData[];
}

const Portfolio: React.FC<IPortfolioProps> = ({ data }) => {
  if (!data.length) {
    return <EmptyData title="У дизайнера пока нет проектов" />;
  }

  return (
    <StyledEngineProvider injectFirst>
      <Grid className="portfolio" justifyContent="center" container>
        {data.map((item, idx) => (
          <MySwiper key={idx} />
        ))}
      </Grid>
    </StyledEngineProvider>
  );
};

export default Portfolio;
