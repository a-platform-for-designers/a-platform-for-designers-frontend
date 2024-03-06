import { Route, Routes } from "react-router";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { lightTheme } from "../theme/index.ts";
import "./index.scss"; // после темы и cssBaseLine
import { Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import ProtectedRoute from "../shared/ProtectedRoute/ProtectedRoute.tsx";
import Header from "../shared/Header/Header.tsx";
import Footer from "../shared/Footer/Footer.tsx";
import {
  CasePage,
  Dashboard,
  DesignersPage,
  ErrorPage,
  MainPage,
  ProfilePage,
  MentorsPage,
  OrdersPage,
  UserOrdersPage,
  OrderPage,
  ResetPasswordPage
} from "@/pages/index.ts";
import {
  Portfolio,
  Profile,
  CaseCreation,
  Mentorship,
  OrderCreation,
  Settings,
  OrderEdit,
  CaseEdit,
} from "@/pages/DashboardPage/components/index.ts";
import { getInfoAboutMe } from "@/redux/slices/userSlice.ts";
import { useAppDispatch } from "@/hooks/reduxHooks.tsx";
import { useEffect } from "react";
import { getData } from "@/redux/slices/dataSlice.ts";
import ChatPage from "@/pages/ChatPage/ChatPage.tsx";
import { MyMessagePopup } from "@/shared/UI/index.ts";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData());
    dispatch(getInfoAboutMe());
  }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline enableColorScheme />
        <SnackbarProvider maxSnack={3} autoHideDuration={7000}>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" Component={MainPage} />
              <Route
                path="/chats"
                element={<ProtectedRoute Component={ChatPage} />}
              />
              <Route path="/designers" Component={DesignersPage} />
              <Route path="/mentors" Component={MentorsPage} />
              <Route path="/profile/:id/*" Component={ProfilePage} />
              <Route
                path="/dashboard"
                element={<ProtectedRoute Component={Dashboard} />}
              >
                <Route index element={<Navigate replace to="profile" />} />
                <Route
                  path="profile"
                  element={<ProtectedRoute Component={Profile} />}
                />
                <Route
                  path="portfolio"
                  element={<ProtectedRoute Component={Portfolio} />}
                >
                  <Route
                    path="edit/:id/*"
                    element={<ProtectedRoute Component={CaseEdit} />}
                  />
                  <Route
                    path="create/*"
                    element={<ProtectedRoute Component={CaseCreation} />}
                  />
                </Route>

                <Route path="mentorship" element={<Mentorship />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="/case/:id" Component={CasePage} />
              <Route path="/orders" Component={OrdersPage} />
              <Route path="/orders/create" Component={OrderCreation} />
              <Route path="/orders/create/:id" Component={OrderEdit} />
              <Route path="/my-orders/*" Component={UserOrdersPage} />
              <Route path="/order/:id" Component={OrderPage} />
              <Route path="/reset/:uid/:token" Component={ResetPasswordPage} />
              <Route path="*" Component={ErrorPage} />
            </Routes>
            <Footer />
            <MyMessagePopup />
          </div>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
