import { Route, Routes } from "react-router";
import { CssBaseline, ThemeProvider } from "@mui/material";
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
  OrdersPage,
} from "@/pages/index.ts";
import {
  Portfolio,
  Profile,
  CaseCreation,
  Work,
  Orders,
  Settings,
} from "../pages/DashboardPage/components/index.ts";
import { getInfoAboutMe } from "@/redux/slices/userSlice.ts";
import { useAppDispatch } from "@/hooks/reduxHooks.tsx";
import { useEffect } from "react";
import { changeAuth } from "@/redux/slices/authSlice.ts";
import { getData } from "@/redux/slices/dataSlice.ts";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getData());
    })();
  });

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token")) {
        try {
          await dispatch(getInfoAboutMe());
          dispatch(changeAuth(true));
        } catch (error) {
          console.log(error);
          dispatch(changeAuth(false));
        }
      }
    })();
  }, [dispatch]);

  // localStorage.clear()

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline enableColorScheme />
      <SnackbarProvider maxSnack={3} autoHideDuration={7000}>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" Component={MainPage} />
            <Route path="/designers" Component={DesignersPage} />
            <Route
              path="/profile/:id/*"
              element={<ProtectedRoute Component={ProfilePage} />}
            />
            <Route path="/dashboard" Component={Dashboard}>
              <Route index element={<Navigate replace to="profile" />} />
              <Route path="profile" element={<Profile />} />
              <Route path="portfolio" element={<Portfolio />}>
                <Route path="create" element={<CaseCreation />} />
              </Route>
              <Route path="work" element={<Work />} />
              <Route path="orders" element={<Orders />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/orders" Component={OrdersPage}></Route>
            <Route path="/case/:id" Component={CasePage} />
            <Route path="*" Component={ErrorPage} />
          </Routes>
          <Footer />
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
