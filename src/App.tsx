import { Route, Routes } from "react-router";
import classes from "./App.module.scss";
import { lightTheme } from "./theme/index.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";

import MainPage from "./pages/MainPage/MainPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import DesignersPage from "./pages/DesignersPage/DesignersPage";
import Dashboard from "./features/dashboard/Dashboard.tsx";
import {
  Profile,
  Portfolio,
  Orders,
  Work,
  Settings,
  CaseCreation,
} from "./features/dashboard/components/index.ts";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline enableColorScheme />
      <div className={classes.app}>
        <Routes>
          <Route path="/" Component={MainPage} />
          <Route path="/designers" Component={DesignersPage} />
          <Route
            path="/profile"
            element={<ProtectedRoute Component={ProfilePage} />}
          />
          <Route path="/dashboard" Component={Dashboard}>
            <Route index element={<Navigate replace to="profile" />} />
            <Route path="profile" element={<Profile />} />
            <Route path="portfolio" element={<Portfolio />}>
              {/* Когда будет АПИ, место id будет id кейса */}
              <Route path="id" element={<CaseCreation />} />
            </Route>
            <Route path="work" element={<Work />} />
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
