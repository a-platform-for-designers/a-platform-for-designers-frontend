import { Grid, StyledEngineProvider } from "@mui/material";
import "./Portfolio.scss";
import React from "react";

import { EmptyData } from "..";
import { useNavigate } from "react-router-dom";
import { IUserCase } from "@/types";
import { BASE_PATH } from "@/constants/constants";
import caseCart from "@/assets/images/caseCart.png";

interface IPortfolioProps {
  data?: IUserCase[];
}

const Portfolio: React.FC<IPortfolioProps> = ({ data }) => {
  const navigate = useNavigate();

  if (!data?.length) {
    return <EmptyData title="У дизайнера пока нет проектов" />;
  }

  return (
    <StyledEngineProvider injectFirst>
      <Grid className="portfolio" justifyContent="center" container>
        {data.map((item) => (
          <img
            className="portfolio__image"
            key={item.id}
            onClick={() => navigate(`/case/${item.id}`)}
            src={`${
              !item.avatar && item.avatar === null
                ? caseCart
                : BASE_PATH + item.avatar
            }`}
          />
        ))}
      </Grid>
    </StyledEngineProvider>
  );
};

export default Portfolio;
