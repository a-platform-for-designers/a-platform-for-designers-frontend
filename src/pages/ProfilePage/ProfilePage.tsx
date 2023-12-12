import { Container, StyledEngineProvider } from "@mui/material";
import "./ProfilePage.scss";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import { Info, ProfileNav, Portfolio, Work, Profile } from "./components";
import { IProfileData } from "./components/Info/Info";
import { IProfileNavPage } from "./components/ProfileNav/ProfileNav";
import { useAppSelector } from "@/hooks/reduxHooks";
// import Preloader from "@/shared/Preloader/Preloader";
import { userService } from "@/api";
import { useEffect, useState } from "react";
import { IUser } from "@/types";

const ProfilePage: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState<IUser>();

  console.log(currentUser);

  useEffect(() => {
    (async () => {
      const userInfo = await userService.getUserById(Number(id));
      setCurrentUser(userInfo);
    })();
  }, [id]);

  const profileData: IProfileData = {
    first_name: currentUser?.first_name,
    last_name: currentUser?.last_name,
    specialization: currentUser?.profiledesigner?.specialization || [
      "Не указана специализация",
    ],
    image: currentUser?.photo,
    country: currentUser?.profiledesigner?.country || "Не указана страна",
    // need to fix later
    registrationDate: new Date(
      user?.date_joined ?? new Date().getDate()
    ).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    status: currentUser?.resume?.status ? "Ищет заказы" : "Не ищет заказы",
    likes: 1001,
    followers: 98,
  };

  // Чтобы добавить пункт меню на странице профиля, дополнить массив
  const profileNavPages: IProfileNavPage[] = [
    {
      title: "Портфолио",
      link: `portfolio`,
      element: <Portfolio data={currentUser?.portfolio} />,
    },
    {
      title: "Работа",
      link: `work`,
      element: currentUser?.resume ? (
        <Work resume={currentUser?.resume} />
      ) : (
        <Work />
      ),
    },
    {
      title: "Профиль",
      link: `file`,
      element: currentUser?.profiledesigner ? (
        <Profile profiledesigner={currentUser?.profiledesigner} />
      ) : (
        <Profile />
      ),
    },
  ];

  return (
    <StyledEngineProvider injectFirst>
      <Container component="section" className="profilePage">
        <Info data={profileData} currentUser={currentUser} />
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
