import { Container, StyledEngineProvider } from "@mui/material";
import "./ProfilePage.scss";
import imgProfilePlaceholder from "../../assets/images/designerscarousel-avatar.png";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import { Info, ProfileNav, Portfolio, Work, Profile } from "./components";
import { IProfileData } from "./components/Info/Info";
import { IProfileNavPage } from "./components/ProfileNav/ProfileNav";
import { useAppSelector } from "@/hooks/reduxHooks";
import Preloader from "@/shared/Preloader/Preloader";
import { userService } from "@/api";
import { useEffect, useState } from "react";

const ProfilePage: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    (async () => {
      const userInfo = await userService.getUserById(Number(id));
      setCurrentUser(userInfo);
    })();
  }, [id]);

  console.log(currentUser);

  if (!user) return <Preloader></Preloader>;

  const profileData: IProfileData = {
    first_name: user?.first_name,
    last_name: user?.last_name,
    specialization: user.profiledesigner?.specialization || [
      "Не указана специализация",
    ],
    image: user.photo || imgProfilePlaceholder,
    country: user.profiledesigner?.country || "Не указана страна",
    registrationDate: new Date(user.date_joined).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    status: user.resume?.status ? "Ищет заказы" : "Не ищет заказы",
    likes: 1001,
    followers: 98,
  };

  // Чтобы добавить пункт меню на странице профиля, дополнить массив
  const profileNavPages: IProfileNavPage[] = [
    {
      title: "Портфолио",
      link: `portfolio`,
      element: <Portfolio data={user.portfolio} />,
    },
    {
      title: "Работа",
      link: `work`,
      element: user.resume ? <Work resume={user.resume} /> : <Work />,
    },
    {
      title: "Профиль",
      link: `file`,
      element: user.profiledesigner ? (
        <Profile profiledesigner={user.profiledesigner} />
      ) : (
        <Profile />
      ),
    },
  ];

  return (
    <StyledEngineProvider injectFirst>
      <Container component="section" className="profilePage">
        <Info data={profileData} />
        <ProfileNav pages={profileNavPages} />
        <Routes>
          <Route path="/">
            <Route
              index
              element={<Navigate replace to={profileNavPages[0].link} />}
            />
            {profileNavPages.map((page, idx) => (
              <Route key={idx} path={page.link} element={page.element} />
            ))}
          </Route>
        </Routes>
      </Container>
    </StyledEngineProvider>
  );
};

export default ProfilePage;
