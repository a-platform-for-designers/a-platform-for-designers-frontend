import { Grid, StyledEngineProvider } from "@mui/material";
import "./ProfileCustomer.scss";
import React from "react";
import { IProfileCustomer } from "../../../../types";
import { AboutItem, EmptyData } from "..";

interface IProps {
  profilecustomer?: IProfileCustomer | null;
  emptyTitle: string;
}

const ProfileCustomer: React.FC<IProps> = ({ profilecustomer, emptyTitle }) => {
  if (!profilecustomer) return <EmptyData title={emptyTitle} />;
  const { post, country, about } = profilecustomer || {};

  return (
    <StyledEngineProvider injectFirst>
      <Grid
        className="profile-customer"
        justifyContent="space-between"
        container
        flexWrap="nowrap"
      >
        <Grid className="profile-customer__main">
          <AboutItem data={about} title="О себе" />
        </Grid>
        <Grid
          container
          className="profile-customer__aside profile-customer__aside_secondary"
          justifyContent="flex-end"
        >
          <AboutItem secondary data={country} title="Страна" />
          <AboutItem secondary data={post} title="Место работы" />
        </Grid>
      </Grid>
    </StyledEngineProvider>
  );
};

export default ProfileCustomer;
