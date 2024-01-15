import "./MentorsPage.scss";
import { StyledEngineProvider, Box, Grid } from "@mui/material";
import { MentorsCard } from "./components";
import Preloader from "@/shared/Preloader/Preloader";
import { IUserWithLastCases } from "@/types";
import { useState } from "react";
import MentorsFilters from "./components/MentorsFilters/MentorsFilters";
import { EmptyData } from "../ProfilePage/components";
import MyPagination from "@/shared/UI/MyPagination/MyPagination";

const MentorsPage: React.FC = () => {
  const [users, setUsers] = useState<IUserWithLastCases[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const USERS_LIMIT = 4;

  return (
    <StyledEngineProvider injectFirst>
      <Box component="main" className="mentorsPage">
        <Box className="mentorsPage__container">
          <Grid
            container
            columns={2}
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            wrap="nowrap"
            className="mentorsPage__grid"
          >
            {isLoading ? (
              <Preloader></Preloader>
            ) : users.length > 0 ? (
              <Grid xs={9} item className="mentorsPage__cards">
                {users?.map((item) => (
                  <MentorsCard key={item.id} user={item} />
                ))}
              </Grid>
            ) : (
              <EmptyData title="На сайте пока нет менторов" />
            )}

            <Grid xs={3} item className="mentorsPage__filters">
              <MentorsFilters
                setMentors={setUsers}
                page={page}
                setPage={setPage}
                setTotalUsers={setTotalUsers}
                limit={USERS_LIMIT}
                setIsLoading={setIsLoading}
              />
            </Grid>
          </Grid>
          <MyPagination
            page={page}
            setPage={setPage}
            totalItems={totalUsers}
            limit={USERS_LIMIT}
          />
        </Box>
      </Box>
    </StyledEngineProvider>
  );
};

export default MentorsPage;
