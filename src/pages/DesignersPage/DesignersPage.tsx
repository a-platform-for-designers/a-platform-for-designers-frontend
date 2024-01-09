import "./DesignersPage.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { DesignerFilters, DesignersCard } from "./components";
import { useState, useEffect } from "react";
import { IUserWithLastCases } from "@/types";
import { userService } from "@/api";
import Preloader from "@/shared/Preloader/Preloader";
import { EmptyData } from "../ProfilePage/components";
import MyPagination from "@/shared/UI/MyPagination/MyPagination";

const DesignersPage: React.FC = () => {
  const [users, setUsers] = useState<IUserWithLastCases[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const USERS_LIMIT = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const usersData = await userService.getUsersList(USERS_LIMIT, page);
        setUsers(usersData.results);
        setTotalUsers(usersData.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <div className="designersPage__cards-wrapper">
                <Grid xs={9} item className="designersPage__cards">
                  {users.map((item) => (
                    <DesignersCard key={item.id} cardOwner={item} />
                  ))}
                </Grid>
                <MyPagination
                  page={page}
                  setPage={setPage}
                  totalItems={totalUsers}
                  limit={USERS_LIMIT}
                />
              </div>
            ) : (
              <EmptyData title="На сайте пока нет дизайнеров" />
            )}

            <Grid xs={3} item className="designersPage__filters">
              {/* ! Компонент фильтров */}
              <DesignerFilters
                setDesigners={setUsers}
                page={page}
                setTotalUsers={setTotalUsers}
                limit={USERS_LIMIT}
              />
              {/* ! Компонент фильтров */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </StyledEngineProvider>
  );
};

export default DesignersPage;
