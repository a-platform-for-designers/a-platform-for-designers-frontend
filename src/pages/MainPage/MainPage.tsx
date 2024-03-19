import "./MainPage.scss";
import { Box, Grid, StyledEngineProvider, SxProps, Theme } from "@mui/material";
import { useState, useEffect } from "react";
import DesinersCarousel from "./components/DesinersCarousel/DesinersCarousel";
import DesinersCategories from "./components/DesinersCategories/DesinersCategories";
import Intro from "./components/Intro/Intro";
import { IDataItem, IDesinerCategoriesData, ICase, IUser } from "@/types";
//import avatarPlaceholder from "../../assets/images/designerscarousel-avatar.webp";
import desCatImg1 from "@/assets/images/desinerscategories-1.webp";
import desCatImg2 from "@/assets/images/desinerscategories-2.webp";
import desCatImg3 from "@/assets/images/desinerscategories-3.webp";
import desCatImg4 from "@/assets/images/desinerscategories-4.webp";
import Feed from "./components/Feed/Feed";
import { casesService, userService } from "@/api";

const mainPageTheme: SxProps<Theme> = {
  backgroundColor: (theme) => theme.palette.background.default,
};

const MainPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [cases, setCases] = useState<ICase[]>([]);
  const [totalCases, setTotalCases] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const CASES_LIMIT = 12;

  // TODO сортировка витринных пользователей по лайкам

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await userService.getUsersWithoutParams();
        const designers = usersData.results.filter((item) => !item.is_customer);
        // designers.sort((a, b) => b.likes - a.likes);
        const slicedDesigners = designers.slice(0, 6);
        console.log(slicedDesigners);
        setUsers(slicedDesigners);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };
    fetchUsers();
  }, []);

  function getUsers() {
    const usersData = users.map((user) => {
      let specialization;

      if (user?.profiledesigner?.specialization) {
        const name: string = "name";
        const firstSpec: number | IDataItem =
          user.profiledesigner.specialization[0];
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
      title: "3D-дизайнеры",
      image: desCatImg3,
      link: "",
    },
    {
      title: "Веб-дизайнеры",
      image: desCatImg4,
      link: "",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const casesData = await casesService.getCasesList(CASES_LIMIT, page);
        setCases(casesData.results);
        setTotalCases(casesData.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {
              <Feed
                cases={cases}
                setCases={setCases}
                isLoading={isLoading}
                totalCases={totalCases}
                setPage={setPage}
                page={page}
                setTotalCases={setTotalCases}
                limit={CASES_LIMIT}
              />
            }
          </Grid>
        }
      </Box>
    </StyledEngineProvider>
  );
};

export default MainPage;
