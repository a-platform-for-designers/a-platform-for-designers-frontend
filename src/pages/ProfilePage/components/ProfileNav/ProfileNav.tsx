import {
  Box,
  Button,
  StyledEngineProvider,
  SxProps,
  Theme,
} from "@mui/material";
import "./ProfileNav.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface IProfileNavPage {
  title: string;
  link: string;
  element: JSX.Element;
}

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
  activeProfileNavPage: IProfileNavPage;
  setActiveProfileNavPage?: React.Dispatch<
    React.SetStateAction<IProfileNavPage>
  >;
}

const ProfileNav: React.FC<IProfileNavProps> = ({
  pages,
  activeProfileNavPage,
}) => {
  const navigate = useNavigate();

  const handleClick: (page: IProfileNavPage) => void = (page) => {
    //setActiveProfileNavPage(page);
    navigate(`./${page.link}`);
  };

  return (
    <StyledEngineProvider injectFirst>
      <Box className="profileNav">
        {pages.map((page) => (
          <Button
            className="profileNav__button"
            variant="outlined"
            key={page.title}
            sx={{
              width: `${100 / pages.length}%`,
              ...buttonStyles,
              ...(activeProfileNavPage.title === page.title
                ? buttonActiveStyles
                : {}),
            }}
            disableRipple
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
