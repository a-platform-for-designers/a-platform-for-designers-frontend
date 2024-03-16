import { Container, StyledEngineProvider, Typography } from "@mui/material";
import "./FavouritesPage.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProfileNav } from "../ProfilePage/components";
import { IProfileNavPage } from "@/types";
import FavouritesCases from "./components/FavouritesCases/FavouritesCases";
import FavouritesOrders from "./components/FavouritesOrders/FavouritesOrders";

const FavouritesPage: React.FC = () => {
  const favouritesNavPages: IProfileNavPage[] = [
    {
      title: "Проекты",
      link: `cases`,
      element: <FavouritesCases />,
    },
    {
      title: "Заказы",
      link: `orders`,
      element: <FavouritesOrders />,
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
