import { Box, Grid, StyledEngineProvider, SxProps, Theme } from "@mui/material";
import "./MainPage.scss";
import Intro from "./components/Intro/Intro";
import { useState, useEffect } from "react";

import DesinersCarousel, {
  IDesinerCarouselData,
} from "./components/DesinersCarousel/DesinersCarousel";
import DesinersCategories, {
  IDesinerCategoriesData,
} from "./components/DesinersCategories/DesinersCategories";

import avatarPlaceholder from "../../assets/images/designerscarousel-avatar.png";
import desCatImg1 from "../../assets/images/desinerscategories-1.png";
import desCatImg2 from "../../assets/images/desinerscategories-2.png";
import desCatImg3 from "../../assets/images/desinerscategories-3.png";
import desCatImg4 from "../../assets/images/desinerscategories-4.png";
import Feed from "./components/Feed/Feed";
import { casesService } from "@/api";
import { ICase } from "@/types";

const mainPageTheme: SxProps<Theme> = {
  backgroundColor: (theme) => theme.palette.background.default,
};

const MainPage: React.FC = () => {
  const desinersForCarousel: IDesinerCarouselData[] = [
    {
      name: "Имя Фамилия",
      specialization: "Специализация",
      image: avatarPlaceholder,
      link: "",
    },
    {
      name: "Имя Фамилия",
      specialization: "Специализация",
      image: avatarPlaceholder,
      link: "",
    },
    {
      name: "Имя Фамилия",
      specialization: "Специализация",
      image: avatarPlaceholder,
      link: "",
    },
    {
      name: "Имя Фамилия",
      specialization: "Специализация",
      image: avatarPlaceholder,
      link: "",
    },
    {
      name: "Имя Фамилия",
      specialization: "Специализация",
      image: avatarPlaceholder,
      link: "",
    },
    {
      name: "Имя Фамилия",
      specialization: "Специализация",
      image: avatarPlaceholder,
      link: "",
    },
  ];

  const desinersCategories: IDesinerCategoriesData[] = [
    {
      title: "Иллюстраторы",
      image: desCatImg1,
      link: "",
    },
    {
      title: "Графические дизайнеры",
      image: desCatImg2,
      link: "",
    },
    {
      title: "3d визуализаторы",
      image: desCatImg3,
      link: "",
    },
    {
      title: "Веб дизайнеры",
      image: desCatImg4,
      link: "",
    },
  ];

  const [cases, setCases] = useState<ICase[]>([]);

  useEffect(() => {
    (async () => {
      const casesData = await casesService.getCasesList(12, 1);
      setCases(casesData.results);
    })();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Box component="main" className="mainPage" sx={mainPageTheme}>
        {
          <Grid
            className="mainPage__container"
            container
            flexDirection={"column"}
          >
            <Intro />
            <DesinersCarousel data={desinersForCarousel} />
            <DesinersCategories data={desinersCategories} />
            {cases.length > 0 && <Feed cases={cases} />}
          </Grid>
        }
      </Box>
    </StyledEngineProvider>
  );
};

export default MainPage;
