import { Grid, StyledEngineProvider } from "@mui/material";
import "./Portfolio.scss";
import React from "react";
import MySwiper from "../../../../components/UI/MySwiper/MySwiper";
import emptyImage from "../../../../assets/images/profile-empty.png";

interface IPortfolioData {}

interface IPortfolioProps {
  data: IPortfolioData[];
}

const Portfolio: React.FC<IPortfolioProps> = ({ data }) => {
  if (!data.length) {
    return (
      <>
        <img src={emptyImage} alt="У дизайнера пока нет проектов" />
        <h2>У дизайнера пока нет проектов</h2>
      </>
    );
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
