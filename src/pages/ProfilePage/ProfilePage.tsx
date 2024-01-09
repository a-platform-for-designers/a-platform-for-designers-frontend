import { Container, StyledEngineProvider } from "@mui/material";
import "./ProfilePage.scss";
import {
  Route,
  Routes,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import {
  Info,
  ProfileNav,
  Portfolio,
  Profile,
  ProfileCustomer,
} from "./components";
import { IProfileNavPage } from "@/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { userService } from "@/api";
import { useEffect, useState } from "react";
import { IUser, IProfileData } from "@/types";
import CustomersOrderCard from "./components/CustomersOrdersCards/CustomersOrdersCards";
import Preloader from "@/shared/Preloader/Preloader";
import Mentoring from "./components/Mentoring/Mentoring";

const ProfilePage: React.FC = () => {
  const { user } = useAppSelector((state) => state.user); // авторизованный пользователь
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState<IUser>(); // пользователь чей профиль(id через путь)
  const isCustomerCurrentUser = currentUser?.is_customer;
  const navigate = useNavigate();
  console.log(user?.mentoring);

  useEffect(() => {
    if (isCustomerCurrentUser) {
      navigate(`/profile/${id}/orders`);
    } else {
      navigate(`/profile/${id}/portfolio`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCustomerCurrentUser]);

  useEffect(() => {
    (async () => {
      const isProfileOfCurrentUser = user?.id === Number(id);
      if (isProfileOfCurrentUser) {
        console.log(user);
        setCurrentUser(user);
      } else {
        setCurrentUser(await userService.getUserById(Number(id)));
      }
    })();
  }, [id, user]);

  const profileData: IProfileData = {
    first_name: currentUser?.first_name,
    last_name: currentUser?.last_name,
    post: currentUser?.profilecustomer?.post || "Не указано о себе",
    specialization: currentUser?.profiledesigner?.specialization || [
      "Не указана специализация",
    ],
    image: currentUser?.photo,
    country:
      currentUser?.profiledesigner?.country ||
      currentUser?.profilecustomer?.country ||
      "Не указана страна",
    registrationDate: new Date(
      currentUser?.date_joined ?? new Date()
    ).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    status: currentUser?.profiledesigner?.work_status
      ? "Ищет работу"
      : "Не ищет работу",
    likes: 1001,
    followers: 98,
  };

  // Чтобы добавить пункт меню на странице профиля, дополнить массив
  const profileNavPages: IProfileNavPage[] = [
    {
      title: "Портфолио",
      link: "portfolio",
      element: <Portfolio data={currentUser?.portfolio} />,
    },
    {
      title: "Менторство",
      link: "mentoring",
      element: currentUser?.mentoring ? (
        <Mentoring
          mentoring={currentUser?.mentoring}
          emptyTitle="Дизайнер пока не заполнил профиль"
        />
      ) : (
        <Mentoring emptyTitle="Здесь пока ничего нет" />
      ),
    },
    {
      title: "Профиль",
      link: "file",
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
      element: currentUser?.profilecustomer ? (
        <ProfileCustomer
          profilecustomer={currentUser?.profilecustomer}
          emptyTitle="Заказчик пока не заполнил профиль"
        />
      ) : (
        <Profile emptyTitle="Заказчик пока не заполнил профиль" />
      ),
    },
  ];

  if (!currentUser) {
    return <Preloader />;
  }

  return (
    <StyledEngineProvider injectFirst>
      <Container component="section" className="profilePage">
        <Info data={profileData} currentUser={currentUser} />
        {isCustomerCurrentUser !== undefined && !isCustomerCurrentUser ? (
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
