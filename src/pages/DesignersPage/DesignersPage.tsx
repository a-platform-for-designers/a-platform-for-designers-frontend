import "./DesignersPage.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { DesignerFilters, DesignersCard } from "./components";

const DesignersPage: React.FC = () => {
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
            <Grid xs={9} item className="designersPage__cards">
              {/* ! Карточки дизайнеров */}
              <DesignersCard />
              <DesignersCard />
              <DesignersCard />
              <DesignersCard />
              <DesignersCard />
              <DesignersCard />
              <DesignersCard />
              <DesignersCard />
              {/* ! */}
            </Grid>
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
