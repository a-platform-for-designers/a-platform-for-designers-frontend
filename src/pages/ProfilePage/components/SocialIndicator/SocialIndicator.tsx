import { Grid, StyledEngineProvider, Typography } from "@mui/material";
import "./SocialIndicator.scss";
import React from "react";
/* import likes from "../../../../assets/icons/Likes.svg"; */
import likesDark from "../../../../assets/icons/LikesDark.svg";

/* const avatarStyles: SxProps<Theme> = {
  height: "212px",
  width: "212px",
  borderRadius: "50%",
}; */

interface ISocialIndicatorProps {}

const SocialIndicator: React.FC<ISocialIndicatorProps> = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Grid
        className="socialIndicator"
        container
        gap="3px"
        flexDirection="column"
        wrap="nowrap"
        alignItems="center"
      >
        <div className="socialIndicator__icon">
          <img src={likesDark} />
        </div>
        <Typography className="socialIndicator__count">1k</Typography>
      </Grid>
    </StyledEngineProvider>
  );
};

export default SocialIndicator;
