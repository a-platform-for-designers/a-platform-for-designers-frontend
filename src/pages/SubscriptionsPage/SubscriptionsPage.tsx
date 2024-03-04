import { Container, StyledEngineProvider } from "@mui/material";
import "../UserOrdersPage/UserOrdersPage.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProfileNav } from "../ProfilePage/components";
import { IProfileNavPage } from "@/types";
import MySubscriptions from "./components/MySubscriptions/MySubscriptions";
import MyFollowers from "./components/MyFollowers/MyFollowers";

const SubscriptionsPage: React.FC = () => {
  const navPages: IProfileNavPage[] = [
    {
      title: "Подписки",
      link: `my-subscriptions`,
      element: <MySubscriptions />,
    },
    {
      title: "Подписчики",
      link: `my-followers`,
      element: <MyFollowers />,
    },
  ];

  return (
    <StyledEngineProvider injectFirst>
      <Container component="section" className="profilePage">
        <ProfileNav pages={navPages} big={true} />
        <Routes>
          <Route path="/">
            <Route index element={<Navigate replace to={navPages[0].link} />} />
            {navPages.map((page, idx) => (
              <Route key={idx} path={page.link} element={page.element} />
            ))}
          </Route>
        </Routes>
      </Container>
    </StyledEngineProvider>
  );
};

export default SubscriptionsPage;
