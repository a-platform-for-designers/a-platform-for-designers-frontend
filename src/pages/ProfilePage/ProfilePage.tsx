import { Container, StyledEngineProvider } from "@mui/material";
import "./ProfilePage.scss";

import profilePlaceholder from "../../assets/images/designerscarousel-avatar.png";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { IProfileDesigner, IResume } from "../../types";
import { Info, ProfileNav, Portfolio, Work, Profile } from "./components";
import { IProfileData } from "./components/Info/Info";
import { IProfileNavPage } from "./components/ProfileNav/ProfileNav";

const workPlaceHolder: IResume = {
  id: 1,
  skills: [
    { id: 1, name: "Коммерческая иллюстраци" },
    { id: 2, name: "Персонажи" },
    { id: 3, name: "Афиши" },
    { id: 4, name: "Леттеринг" },
    { id: 5, name: "Книжная иллюстрация" },
  ],
  instruments: [
    { id: 1, name: "Photoshop" },
    { id: 2, name: "Illustrator" },
    { id: 3, name: "Figma" },
  ],
  about: "about",
};

const profilePlaceHolder: IProfileDesigner = {
  id: 1,
  user: 1,
  education: "Школа дизайна НИУ ВШЭ",
  country: "Россия",
  specialization: 1,
  hobby: `В свободное от работы время, я люблю читать книги. Часто бываю 
  на природе, это помогает мне не только перезагрузиться, но и очень вдохновляет меня.  Также я читаю книги детям в местной библиотеке, это помогает развиваться в моей работе, так как я могу видеть реакцию детей на иллюстрации в живую. `,
  language: ["Russian", "English"],
};

// Чтобы добавить пункт меню на странице профиля, дополнить массив
const profileNavPages: IProfileNavPage[] = [
  {
    title: "Портфолио",
    link: "portfolio",
    element: <Portfolio data={[...new Array(8)]} />,
  },
  { title: "Работа", link: "work", element: <Work {...workPlaceHolder} /> },
  {
    title: "Профиль",
    link: "file",
    element: <Profile {...profilePlaceHolder} />,
  },
];

const ProfilePage: React.FC = () => {
  const location = useLocation();

  const [activeProfileNavPage, setActiveProfileNavPage] =
    useState<IProfileNavPage>(profileNavPages[0]);

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

  useEffect(() => {
    const pathnameArray = location.pathname.split("/");
    const endpoint = pathnameArray[pathnameArray.length - 1];

    if (!endpoint) {
      setActiveProfileNavPage(profileNavPages[0]);
    } else {
      const activePage = profileNavPages.find((page) => page.link === endpoint);

      if (activePage) {
        setActiveProfileNavPage(activePage);
      }
    }
  }, [location.pathname]);

  return (
    <StyledEngineProvider injectFirst>
      <Container component="section" className="profilePage">
        <Info data={profileData} />
        <ProfileNav
          pages={profileNavPages}
          activeProfileNavPage={activeProfileNavPage}
          setActiveProfileNavPage={setActiveProfileNavPage}
        />
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
