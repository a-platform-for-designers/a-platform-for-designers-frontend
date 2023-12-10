import "./MentorsPage.scss";
import { StyledEngineProvider, Box, Grid } from "@mui/material";
import { DesignersCard } from "./components";
import Preloader from "@/shared/Preloader/Preloader";
import { userService } from "@/api";
import { IUserWithLastCases } from "@/types";
import { useState, useEffect } from "react";
import MentorsFilters from "./components/MentorsFilters/MentorsFilters";

const MentorsPage: React.FC = () => {
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
              <MentorsFilters />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </StyledEngineProvider>
  );
};

export default MentorsPage;
