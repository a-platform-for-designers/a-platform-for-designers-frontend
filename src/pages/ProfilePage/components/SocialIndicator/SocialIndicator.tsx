import { Grid, StyledEngineProvider, Typography } from "@mui/material";
import "./SocialIndicator.scss";
import React from "react";
import likesEmptyImage from "../../../../assets/icons/LikesEmpty.svg";
import followersImage from "../../../../assets/icons/FollowersIcon.svg";

/* const avatarStyles: SxProps<Theme> = {
  height: "212px",
  width: "212px",
  borderRadius: "50%",
}; */

interface ISocialIndicatorProps {
  variant: "likes" | "followers";
  active?: boolean;
  onClick?: React.MouseEventHandler;
  count: number;
}

const SocialIndicator: React.FC<ISocialIndicatorProps> = ({
  variant,
  onClick,
  count,
}) => {
  let text = "";

  if (count / 1000000 >= 1) {
    text = `${Math.round(count / 1000000)}kk`;
  } else if (count / 1000 >= 1) {
    text = `${Math.round(count / 1000)}k`;
  } else {
    text = `${count}`;
  }

  switch (variant) {
    case "likes":
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
            <button
              type="button"
              className="socialIndicator__icon socialIndicator__button"
            >
              <img src={likesEmptyImage} />
            </button>
            <Typography className="socialIndicator__count">{text}</Typography>
          </Grid>
        </StyledEngineProvider>
      );

    case "followers":
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
              <img src={followersImage} onClick={onClick} />
            </div>
            <Typography className="socialIndicator__count">{text}</Typography>
          </Grid>
        </StyledEngineProvider>
      );
  }
};

export default SocialIndicator;
