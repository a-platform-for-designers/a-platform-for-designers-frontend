import { Box, Grid, StyledEngineProvider } from "@mui/material";
import "./DesignersPage.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DesignersCard from "../../components/DesignersCard/DesignersCard";
import DesignerFilters from "../../components/DesignerFilters/DesignerFilters";

const DesignersPage: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Header />
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
            <Grid xs={9} className="designersPage__cards">
              {/* ! */}
              <DesignersCard />
              <DesignersCard />
              <DesignersCard />
              {/* ! */}
            </Grid>
            <Grid xs={3} className="designersPage__filters">
              {/* ! Компонент фильтров */}
              <DesignerFilters />
              {/* ! Компонент фильтров */}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </StyledEngineProvider>
  );
};

export default DesignersPage;
