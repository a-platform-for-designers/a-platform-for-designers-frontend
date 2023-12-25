import "./MainPage.scss";
import { Box, Grid, StyledEngineProvider, SxProps, Theme } from "@mui/material";
import Intro from "./components/Intro/Intro";
import { useState, useEffect } from "react";

import DesinersCarousel from "./components/DesinersCarousel/DesinersCarousel";
import DesinersCategories from "./components/DesinersCategories/DesinersCategories";
import { IDesinerCategoriesData } from "@/types";

//import avatarPlaceholder from "../../assets/images/designerscarousel-avatar.png";
import desCatImg1 from "../../assets/images/desinerscategories-1.png";
import desCatImg2 from "../../assets/images/desinerscategories-2.png";
import desCatImg3 from "../../assets/images/desinerscategories-3.png";
import desCatImg4 from "../../assets/images/desinerscategories-4.png";
import Feed from "./components/Feed/Feed";
import { casesService, userService } from "@/api";
import { ICase, IUserWithLastCases } from "@/types";

const mainPageTheme: SxProps<Theme> = {
  backgroundColor: (theme) => theme.palette.background.default,
};

const MainPage: React.FC = () => {
  const [users, setUsers] = useState<IUserWithLastCases[]>([]);

  useEffect(() => {
    (async () => {
      const usersData = await userService.getUsersList(6, 1);
      setUsers(usersData.results);
    })();
  }, []);

  function getUsers() {
    const usersData = users.map((user) => {
      let specialization;

      if (user.specialization) {
        const name: string = "name";
        const firstSpec: object = user.specialization[0];
        specialization = String(firstSpec[name as keyof typeof firstSpec]);
      }

      const data = {
        name: `${user.first_name} ${user.last_name}`,
        specialization: specialization,
        image: user.photo,
        link: `/profile/${user.id}/`,
      };
      return data;
    });

    return usersData;
  }

  // const desinersForCarousel: IDesinerCarouselData[] = [
  //   {
  //     name: "Имя Фамилия",
  //     specialization: "Специализация",
  //     image: avatarPlaceholder,
  //     link: "",
  //   },
  //   {
  //     name: "Имя Фамилия",
  //     specialization: "Специализация",
  //     image: avatarPlaceholder,
  //     link: "",
  //   },
  //   {
  //     name: "Имя Фамилия",
  //     specialization: "Специализация",
  //     image: avatarPlaceholder,
  //     link: "",
  //   },
  //   {
  //     name: "Имя Фамилия",
  //     specialization: "Специализация",
  //     image: avatarPlaceholder,
  //     link: "",
  //   },
  //   {
  //     name: "Имя Фамилия",
  //     specialization: "Специализация",
  //     image: avatarPlaceholder,
  //     link: "",
  //   },
  //   {
  //     name: "Имя Фамилия",
  //     specialization: "Специализация",
  //     image: avatarPlaceholder,
  //     link: "",
  //   },
  // ];

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
      title: "3D-визуализаторы",
      image: desCatImg3,
      link: "",
    },
    {
      title: "Веб-дизайнеры",
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
            <DesinersCarousel data={getUsers()} />
            <DesinersCategories data={desinersCategories} />
            {<Feed cases={cases} setCases={setCases} />}
          </Grid>
        }
      </Box>
    </StyledEngineProvider>
  );
};

export default MainPage;
