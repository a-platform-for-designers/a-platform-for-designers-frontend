import { Box, Grid, StyledEngineProvider, SxProps, Theme } from "@mui/material";
import "./MainPage.scss";
import Intro from "../../components/Intro/Intro";

import DesinersCarousel, {
  IDesinerCarouselData,
} from "../../components/DesinersCarousel/DesinersCarousel";
import DesinersCategories, {
  IDesinerCategoriesData,
} from "../../components/DesinersCategories/DesinersCategories";

import Nikolay from "../../assets/images/our_team/Nikolay.jpg";
import Alena from "../../assets/images/our_team/Alena.jpg";
import Anna from "../../assets/images/our_team/Anna.jpg";
import Mary from "../../assets/images/our_team/Mary.jpg";
import Marya from "../../assets/images/our_team/Marya.jpg";
import Nastya from "../../assets/images/our_team/tNdf4SmiaBM.jpg";

import desCatImg1 from "../../assets/images/desinerscategories-1.png";
import desCatImg2 from "../../assets/images/desinerscategories-2.png";
import desCatImg3 from "../../assets/images/desinerscategories-3.png";
import desCatImg4 from "../../assets/images/desinerscategories-4.png";
import Feed from "../../components/Feed/Feed";
import { swiperContentData } from "@/utils/constants";

const mainPageTheme: SxProps<Theme> = {
  backgroundColor: (theme) => theme.palette.background.default,
};

const MainPage: React.FC = () => {
  const desinersForCarousel: IDesinerCarouselData[] = [
    {
      name: "Хван Николай",
      specialization: "3D-визуализатор",
      image: Nikolay,
      link: "",
    },
    {
      name: "Кутернина Алёна",
      specialization: "Веб-дизайнер",
      image: Alena,
      link: "",
    },
    {
      name: "Торопова Анна",
      specialization: "Иллюстратор",
      image: Anna,
      link: "",
    },
    {
      name: "Макарова Мэри",
      specialization: "Графический дизайнер",
      image: Mary,
      link: "",
    },
    {
      name: "Науменко Мария",
      specialization: "Веб-дизайнер",
      image: Marya,
      link: "",
    },
    {
      name: "Клыкова Анастасия",
      specialization: "Графический дизайнер",
      image: Nastya,
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
      title: "3D визуализаторы",
      image: desCatImg3,
      link: "",
    },
    {
      title: "Веб-дизайнеры",
      image: desCatImg4,
      link: "",
    },
  ];

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
            <Feed data={swiperContentData} />
          </Grid>
        }
      </Box>
    </StyledEngineProvider>
  );
};

export default MainPage;
