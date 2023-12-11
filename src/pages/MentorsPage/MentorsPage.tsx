import "./MentorsPage.scss";
import { StyledEngineProvider, Box, Grid } from "@mui/material";
import { DesignersCard } from "./components";
import Preloader from "@/shared/Preloader/Preloader";
import { userService } from "@/api";
import { IUserWithLastCases } from "@/types";
import { useState, useEffect } from "react";
import MentorsFilters from "./components/MentorsFilters/MentorsFilters";
import { EmptyData } from "../ProfilePage/components";

const MentorsPage: React.FC = () => {
  const [users, setUsers] = useState<IUserWithLastCases[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const usersData = await userService.getMentorsList(12, 1);
        setUsers(usersData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
                  <DesignersCard key={item.id} user={item} />
                ))}
              </Grid>
            ) : (
              <EmptyData title="На сайте пока нет менторов" />
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
