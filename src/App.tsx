import { Route, Routes } from "react-router";
import classes from "./App.module.scss";
import { lightTheme } from "./theme/index.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";

import MainPage from "./pages/MainPage/MainPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import DesignersPage from "./pages/DesignersPage/DesignersPage";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import CasePage from "./pages/CasePage/CasePage.tsx";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline enableColorScheme />
      <div className={classes.app}>
        <Header />
        <Routes>
          <Route path="/" Component={MainPage} />
          <Route path="/designers" Component={DesignersPage} />
          <Route
            path="/profile/*"
            element={<ProtectedRoute Component={ProfilePage} />}
          />
          <Route path="/case/:id" Component={CasePage} />
          <Route path="*" Component={ErrorPage} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
