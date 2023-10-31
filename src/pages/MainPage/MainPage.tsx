import { Grid } from "@mui/material";
import "./MainPage.scss";
import Intro from "../../components/Intro/Intro";

import DesinersCarousel, {
  IDesinerCarouselData,
} from "../../components/DesinersCarousel/DesinersCarousel";
import DesinersCategories, {
  IDesinerCategoriesData,
} from "../../components/DesinersCategories/DesinersCategories";

import avatarPlaceholder from "../../assets/images/designerscarousel-avatar.png";
import desCatImg1 from "../../assets/images/desinerscategories-1.png";
import desCatImg2 from "../../assets/images/desinerscategories-2.png";
import desCatImg3 from "../../assets/images/desinerscategories-3.png";
import desCatImg4 from "../../assets/images/desinerscategories-4.png";
import Feed from "../../components/Feed/Feed";
import Header from "../../components/Header/Header";

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

  return (
    <Grid
      className="mainPage"
      container
      flexDirection={"column"}
      sx={{ outline: "1px solid red" }}
    >
      <Header />
      <Intro />
      <DesinersCarousel data={desinersForCarousel} />
      <DesinersCategories data={desinersCategories} />
      <Feed data={[...new Array(12)]} />
    </Grid>
  );
};

export default MainPage;
