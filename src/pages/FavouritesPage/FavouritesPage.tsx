import { Container, StyledEngineProvider, Typography } from "@mui/material";
import "./FavouritesPage.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProfileNav } from "../ProfilePage/components";
import { IProfileNavPage } from "@/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import CustomersOrderCard from "../ProfilePage/components/CustomersOrdersCards/CustomersOrdersCards";
import FavouritedCases from "./components/FavouritesCases/FavouritesCases";

const FavouritesPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.user); // авторизованный пользователь

  const favouritesNavPages: IProfileNavPage[] = [
    {
      title: "Проекты",
      link: `cases`,
      element: <FavouritedCases />,
    },
    {
      title: "Заказы",
      link: `orders`,
      element: <CustomersOrderCard userId={user?.id} />,
    },
  ];

  return (
    <StyledEngineProvider injectFirst>
      <Container component="section" className="profilePage">
        <Typography component="h2" className="user-orders__title">
          Избранное
        </Typography>
        <ProfileNav pages={favouritesNavPages} big={true} />
        <Routes>
          <Route path="/">
            <Route
              index
              element={<Navigate replace to={favouritesNavPages[0].link} />}
            />
            {favouritesNavPages.map((page, idx) => (
              <Route key={idx} path={page.link} element={page.element} />
            ))}
          </Route>
        </Routes>
      </Container>
    </StyledEngineProvider>
  );
};

export default FavouritesPage;
