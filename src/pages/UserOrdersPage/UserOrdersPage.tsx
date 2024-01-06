import { Container, StyledEngineProvider } from "@mui/material";
import "./UserOrdersPage.scss";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { ProfileNav, Profile } from "../ProfilePage/components";
import { IProfileNavPage } from "@/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import CustomersOrderCard from "../ProfilePage/components/CustomersOrdersCards/CustomersOrdersCards";
import { MyButton } from "@/shared/UI";

const UserOrdersPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.user); // авторизованный пользователь
  const isCustomerCurrentUser = user?.is_customer;
  const navigate = useNavigate();

  function addOrder() {
    navigate("/orders/create");
  }

  console.log(user?.id);

  const profileDesignerNavPages: IProfileNavPage[] = [
    {
      title: "Отклики",
      link: `orders`,
      element: <CustomersOrderCard userId={user?.id} />,
    },
    {
      title: "Архив",
      link: `archive`,
      element: <Profile emptyTitle="Здесь пока нет заказов" />,
    },
  ];

  const profileCustomerNavPages: IProfileNavPage[] = [
    {
      title: "Активные заказы",
      link: `orders`,
      element: <CustomersOrderCard userId={user?.id} />,
    },
    {
      title: "Архив",
      link: `archive`,
      element: <Profile emptyTitle="Здесь пока нет заказов" />,
    },
  ];

  return (
    <StyledEngineProvider injectFirst>
      <Container component="section" className="profilePage">
        <div className="user-orders__header">
          <h2 className="user-orders__title">Мои заказы</h2>
          {isCustomerCurrentUser ? (
            <MyButton
              size="small"
              className="user-orders__add-button"
              onClick={addOrder}
            >
              + Создать заказ
            </MyButton>
          ) : null}
        </div>
        {isCustomerCurrentUser !== undefined && !isCustomerCurrentUser ? (
          <>
            <ProfileNav pages={profileDesignerNavPages} big={true} />
            <Routes>
              <Route path="/">
                <Route
                  index
                  element={
                    <Navigate replace to={profileDesignerNavPages[0].link} />
                  }
                />
                {profileDesignerNavPages.map((page, idx) => (
                  <Route key={idx} path={page.link} element={page.element} />
                ))}
              </Route>
            </Routes>
          </>
        ) : (
          <>
            <ProfileNav pages={profileCustomerNavPages} big={true} />
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

export default UserOrdersPage;
