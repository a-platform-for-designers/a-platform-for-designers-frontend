import {
  Box,
  Button,
  StyledEngineProvider,
  SxProps,
  Theme,
} from "@mui/material";
import "./ProfileNav.scss";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IProfileNavPage } from "@/types";

const buttonStyles: SxProps<Theme> = {
  borderRadius: "4px",
  borderWidth: "2px",
  borderColor: (theme) => theme.palette.action.disabledBackground,
  color: (theme) => theme.palette.text.primary,
  "&:hover": {
    borderColor: (theme) => theme.palette.primary.main,
    color: (theme) => theme.palette.text.primary,
  },
};

const buttonActiveStyles: SxProps<Theme> = {
  borderColor: (theme) => theme.palette.primary.main,
  color: (theme) => theme.palette.text.primary,
};

interface IProfileNavProps {
  pages: IProfileNavPage[];
  big?: boolean;
}

const ProfileNav: React.FC<IProfileNavProps> = ({ pages, big }) => {
  const navigate = useNavigate();

  const handleClick: (page: IProfileNavPage) => void = (page) => {
    navigate(`./${page.link}`);
  };

  const { pathname } = useLocation();

  return (
    <StyledEngineProvider injectFirst>
      <Box className="profileNav">
        {pages.map((page) => (
          <Button
            className={
              !big
                ? "profileNav__button"
                : "profileNav__button profileNav__big-button"
            }
            variant="outlined"
            key={page.title}
            sx={{
              width: `${100 / pages.length}%`,
              ...buttonStyles,
              ...(pathname.split("/").includes(page.link)
                ? buttonActiveStyles
                : {}),
            }}
            onClick={() => handleClick(page)}
          >
            {page.title}
          </Button>
        ))}
      </Box>
    </StyledEngineProvider>
  );
};

export default ProfileNav;
