import { Box, Container, Grid } from "@mui/material";
import "./DesignersPage.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DesignersCard from "../../components/DesignersCard/DesignersCard";

const DesignersPage: React.FC = () => {
  return (
    <>
      <Header />
      <Box component="main" className="designersPage">
        <Container>
          <Grid
            container
            columns={2}
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            wrap="nowrap"
          >
            <Grid item xs={8}>
              {/* ! */}
              <DesignersCard />
              <DesignersCard />
              <DesignersCard />
              {/* ! */}
            </Grid>
            <Grid item xs={4}>
              22
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default DesignersPage;
