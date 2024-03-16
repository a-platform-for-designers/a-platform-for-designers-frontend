import { Box, Grid, StyledEngineProvider } from "@mui/material";
import "./FavouritesCases.scss";
import { IFavouriteCase } from "@/types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { casesService } from "@/api";
import EmptyData from "@/pages/ProfilePage/components/EmptyData/EmptyData";
// import { MyPagination } from "@/shared/UI";

// TODO настроить пагинацию

const FavouritesCases: React.FC = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState<IFavouriteCase[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const casesData = await casesService.getFavouritedCases();
        setCases(casesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Box className="favouritedCases">
        {cases ? (
          <Grid xs={9} item className="favouritedCases__cards">
            {cases.map((item) => (
              <img
                src={item.avatar}
                key={item.id}
                className="favouritedCases__image"
                onClick={() => navigate(`/case/${item.id}`)}
              />
            ))}
          </Grid>
        ) : (
          <EmptyData title="Нет активных заказов" />
        )}
      </Box>
      {/* {cases.length > 12 && (
        <div>
          <MyPagination
            totalItems={cases.length}
            setPage={setPage}
            page={page}
            limit={CASES_LIMIT}
          />
        </div> 
      )}*/}
    </StyledEngineProvider>
  );
};

export default FavouritesCases;
