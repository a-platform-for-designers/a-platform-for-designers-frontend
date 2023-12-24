import "./DesignersPage.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { DesignerFilters, DesignersCard } from "./components";
import { useState, useEffect } from "react";
import { IUserWithLastCases } from "@/types";
import { userService } from "@/api";
import Preloader from "@/shared/Preloader/Preloader";
import { EmptyData } from "../ProfilePage/components";

const DesignersPage: React.FC = () => {
  const [users, setUsers] = useState<IUserWithLastCases[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const usersData = await userService.getUsersList(12, 1);
        setUsers(usersData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Box component="main" className="designersPage">
        <Box className="designersPage__container">
          <Grid
            container
            columns={2}
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            wrap="nowrap"
            className="designersPage__grid"
          >
            {isLoading ? (
              <Preloader></Preloader>
            ) : users.length > 0 ? (
              <Grid xs={9} item className="designersPage__cards">
                {users.map((item) => (
                  <DesignersCard key={item.id} cardOwner={item} />
                ))}
              </Grid>
            ) : (
              <EmptyData title="На сайте пока нет дизайнеров" />
            )}

            <Grid xs={3} item className="designersPage__filters">
              {/* ! Компонент фильтров */}
              <DesignerFilters setDesigners={setUsers} />
              {/* ! Компонент фильтров */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </StyledEngineProvider>
  );
};

export default DesignersPage;
