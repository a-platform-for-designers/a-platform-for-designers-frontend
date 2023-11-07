import { Container, StyledEngineProvider } from "@mui/material";
import "./ProfilePage.scss";
import Info, { IProfileData } from "./components/Info/Info";

import profilePlaceholder from "../../assets/images/designerscarousel-avatar.png";
import ProfileNav, {
  IProfileNavPage,
} from "./components/ProfileNav/ProfileNav";
import { Route, Routes } from "react-router-dom";
import SocialIndicator from "./components/SocialIndicator/SocialIndicator";
import Portfolio from "./components/Portfolio/Portfolio";

const ProfilePage: React.FC = () => {
  const profileNavPages: IProfileNavPage[] = [
    {
      title: "Портфолио",
      link: "portfolio",
    },
    { title: "Работа", link: "work" },
    {
      title: "Профиль",
      link: "profile",
    },
  ];

  const profileData: IProfileData = {
    name: "Ирина Петрова",
    specialization: "Графический дизайнер",
    image: profilePlaceholder,
    country: "Россия",
    registrationDate: "12 ноября 2023",
    status: "Ищет заказы",
    likes: 1001,
    followers: 98,
  };

  return (
    <StyledEngineProvider injectFirst>
      <Container component="section" className="profilePage">
        <Info data={profileData} />
        <ProfileNav pages={profileNavPages} />
        <Routes>
          <Route path="/">
            <Route
              path={profileNavPages[0].link}
              element={<Portfolio data={[...new Array(8)]} />}
            />
            <Route
              path={profileNavPages[1].link}
              element={<SocialIndicator />}
            />
            <Route
              path={profileNavPages[2].link}
              element={<SocialIndicator />}
            />
          </Route>
        </Routes>
      </Container>
    </StyledEngineProvider>
  );
};

export default ProfilePage;
