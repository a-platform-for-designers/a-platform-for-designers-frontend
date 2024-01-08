import { Grid, StyledEngineProvider } from "@mui/material";
import "./Portfolio.scss";
import React from "react";

import { EmptyData } from "..";
import { useNavigate } from "react-router-dom";
import { IUserCase } from "@/types";
import { BASE_PATH } from "@/constants/constants";
import caseCart from "@/assets/images/caseCart.webp";
import MyOptimizedImage from "@/shared/UI/MyOptimizedImage/MyOptimizedImage";

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
          <MyOptimizedImage
            imageUrl={`${
              !item.avatar && item.avatar === null
                ? caseCart
                : BASE_PATH + item.avatar
            }`}
            key={item.id}
            alt="Картинка из проекта"
            className="portfolio__image"
            width={660}
            height={480}
            format="webp"
            maxAge="7d"
            onClick={() => navigate(`/case/${item.id}`)}
          />
        ))}
      </Grid>
    </StyledEngineProvider>
  );
};

export default Portfolio;
