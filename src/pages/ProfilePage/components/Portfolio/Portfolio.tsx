import { Grid, StyledEngineProvider } from "@mui/material";
import "./Portfolio.scss";
import React from "react";
import MySwiper, { ICase } from "../../../../components/UI/MySwiper/MySwiper";
import { EmptyData } from "..";

interface IProps {
  data: ICase[];
}

const Portfolio: React.FC<IProps> = ({ data }) => {
  if (!data.length) {
    return <EmptyData title="У дизайнера пока нет проектов" />;
  }

  return (
    <StyledEngineProvider injectFirst>
      <Grid className="portfolio" justifyContent="center" container>
        {data.map((item) => (
          <MySwiper key={item.id} {...item} />
        ))}
      </Grid>
    </StyledEngineProvider>
  );
};

export default Portfolio;
