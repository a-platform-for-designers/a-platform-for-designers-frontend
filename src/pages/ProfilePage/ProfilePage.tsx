import { Container, StyledEngineProvider } from "@mui/material";
import "./ProfilePage.scss";

import { Route, Routes, Navigate } from "react-router-dom";

import { IProfileDesigner, IResume } from "../../types";
import { Info, ProfileNav, Portfolio, Work, Profile } from "./components";
import { IProfileNavPage } from "./components/ProfileNav/ProfileNav";
import { currentUserCases, currentUserInfo } from "@/utils/constants";

const workPlaceHolder: IResume = {
  id: 1,
  skills: [
    { id: 1, name: "Коммерческая иллюстрация" },
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
  about:
    "Детский диджитал-иллюстратор.\nСоздаю на заказ: \n- бренд-персонажей \n- упаковки, афиши, и другой визуал для рекламы и маркетинга \n- обложки и книжные иллюстрации - леттеринг\n\nСреди моих клиентов: Центробанк России, сеть «Дикси», всероссийская лотерея «Столото», холдинг «Умница», издательство «The Little Press», английский журнал «Storytime Magazine», издательство Malamalama и другие бренды и компании.",
};

const profilePlaceHolder: IProfileDesigner = {
  id: 1,
  user: 1,
  education: "Школа дизайна НИУ ВШЭ",
  country: "Россия",
  specialization: 1,
  hobby: `В свободное от работы время, я люблю читать книги. Часто бываю 
  на природе, это помогает мне не только перезагрузиться, но и очень вдохновляет меня.  Также я читаю книги детям в местной библиотеке, это помогает развиваться в моей работе, так как я могу видеть реакцию детей на иллюстрации вживую. `,
  language: ["Русский", "Английский"],
};

// Чтобы добавить пункт меню на странице профиля, дополнить массив
const profileNavPages: IProfileNavPage[] = [
  {
    title: "Портфолио",
    link: `portfolio`,
    element: <Portfolio data={currentUserCases} />,
  },
  { title: "Работа", link: `work`, element: <Work {...workPlaceHolder} /> },
  {
    title: "Профиль",
    link: `file`,
    element: <Profile {...profilePlaceHolder} />,
  },
];

const ProfilePage: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Container component="section" className="profilePage">
        <Info data={currentUserInfo} />
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
