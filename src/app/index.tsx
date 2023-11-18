import { Route, Routes } from "react-router";
import classes from "./index.module.scss";
import { lightTheme } from "../theme/index.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import MainPage from "../pages/MainPage/MainPage.tsx";
import ProfilePage from "../pages/ProfilePage/ProfilePage.tsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.tsx";
import DesignersPage from "../pages/DesignersPage/DesignersPage.tsx";
import Dashboard from "../pages/DashboardPage/Dashboard.tsx";
import { Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import CasePage from "../pages/CasePage/CasePage.tsx";
import {
  Portfolio,
  Profile,
  CaseCreation,
  Work,
  Orders,
  Settings,
} from "../pages/DashboardPage/components/index.ts";
import ProtectedRoute from "../shared/ProtectedRoute/ProtectedRoute.tsx";
import Header from "../shared/Header/Header.tsx";
import Footer from "../shared/Footer/Footer.tsx";
function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline enableColorScheme />
      <SnackbarProvider maxSnack={3} autoHideDuration={7000}>
        <div className={classes.app}>
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
