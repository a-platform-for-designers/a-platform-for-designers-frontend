import { Container, StyledEngineProvider } from "@mui/material";
import "./ProfilePage.scss";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import { Info, ProfileNav, Portfolio, Work, Profile } from "./components";
import { IProfileData } from "./components/Info/Info";
import { IProfileNavPage } from "./components/ProfileNav/ProfileNav";
import { useAppSelector } from "@/hooks/reduxHooks";
import Preloader from "@/shared/Preloader/Preloader";
import { userService } from "@/api";
import { useEffect, useState } from "react";
import { IUser } from "@/types";
import CustomersOrderCard from "./components/CustomersOrdersCards/CustomersOrdersCards";

const ProfilePage: React.FC = () => {
  const { user } = useAppSelector((state) => state.user); // авторизованный пользователь
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState<IUser>(); // пользователь чей профиль(id через путь)

  const isCustomerUserPrifile = user?.is_customer;
  const isCustomerCurrentUser = currentUser?.is_customer;
  const isMyProfile = currentUser?.id === user?.id;
  console.log(isMyProfile, isCustomerUserPrifile);

  useEffect(() => {
    (async () => {
      const userInfo = await userService.getUserById(Number(id));
      setCurrentUser(userInfo);
    })();
  }, [id]);

  if (!user) return <Preloader></Preloader>;

  const profileData: IProfileData = {
    first_name: currentUser?.first_name,
    last_name: currentUser?.last_name,
    specialization: currentUser?.profiledesigner?.specialization || [
      "Не указана специализация",
    ],
    image: currentUser?.photo,
    country: currentUser?.profiledesigner?.country || "Не указана страна",
    // need to fix later
    registrationDate: new Date(user.date_joined).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    status: currentUser?.resume?.status ? "Ищет работу" : "Не ищет работу",
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
        <Profile
          profiledesigner={currentUser?.profiledesigner}
          emptyTitle="Дизайнер пока не заполнил профиль"
        />
      ) : (
        <Profile emptyTitle="Здесь пока ничего нет" />
      ),
    },
  ];

  const profileCustomerNavPages: IProfileNavPage[] = [
    {
      title: "Активные заказы",
      link: `orders`,
      element: <CustomersOrderCard userId={currentUser?.id} />,
    },
    {
      title: "Профиль",
      link: `file`,
      element: currentUser?.profiledesigner ? (
        <Profile
          profiledesigner={currentUser?.profiledesigner}
          emptyTitle="Заказчик пока не заполнил профиль"
        />
      ) : (
        <Profile emptyTitle="Заказчик пока не заполнил профиль" />
      ),
    },
  ];

  console.log(currentUser);

  return (
    <StyledEngineProvider injectFirst>
      <Container component="section" className="profilePage">
        <Info data={profileData} currentUser={currentUser} />
        {!isCustomerCurrentUser ? (
          <>
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
          </>
        ) : (
          <>
            <ProfileNav pages={profileCustomerNavPages} />
            <Routes>
              <Route path="/">
                <Route
                  index
                  element={
                    <Navigate replace to={profileCustomerNavPages[0].link} />
                  }
                />
                {profileCustomerNavPages.map((page, idx) => (
                  <Route key={idx} path={page.link} element={page.element} />
                ))}
              </Route>
            </Routes>
          </>
        )}
      </Container>
    </StyledEngineProvider>
  );
};

export default ProfilePage;
