import { Grid, Typography } from "@mui/material";
import "./EmptyData.scss";
import React from "react";
import emptyImage from "../../../../assets/images/profile-empty.webp";

interface IEmptyDataProps {
  title: string;
}

const EmptyData: React.FC<IEmptyDataProps> = ({ title }) => {
  return (
    <>
      <Grid
        display="flex"
        className="emptyData"
        flexDirection="column"
        marginTop="100px"
        justifyContent="center"
        alignItems="center"
        gap="20px"
      >
        <img className="emptyData__image" src={emptyImage} alt={title} />
        <Typography component="h2" className="emptyData__title">
          {title}
        </Typography>
      </Grid>
    </>
  );
};

export default EmptyData;
