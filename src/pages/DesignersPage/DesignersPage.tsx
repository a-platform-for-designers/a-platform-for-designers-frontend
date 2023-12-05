import "./DesignersPage.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { DesignerFilters, DesignersCard } from "./components";
import { useState, useEffect } from "react";
import { IUserWithLastCases } from "@/types";
import { userService } from "@/api";
import Preloader from "@/shared/Preloader/Preloader";

const DesignersPage: React.FC = () => {
  const [users, setUsers] = useState<IUserWithLastCases[]>([]);

  useEffect(() => {
    (async () => {
      const usersData = await userService.getUsersList(12, 1);
      setUsers(usersData.results);
    })();
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
          >
            {users.length > 0 ? (
              <Grid xs={9} item className="designersPage__cards">
                {users.map((item) => (
                  <DesignersCard key={item.id} user={item} />
                ))}
              </Grid>
            ) : (
              <Preloader></Preloader>
            )}

            <Grid xs={3} item className="designersPage__filters">
              {/* ! Компонент фильтров */}
              <DesignerFilters />
              {/* ! Компонент фильтров */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </StyledEngineProvider>
  );
};

export default DesignersPage;
