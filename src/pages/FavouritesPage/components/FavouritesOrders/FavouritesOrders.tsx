import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IOrdersList } from "@/types";
import { useState, useEffect } from "react";
import { MyOrdersCard } from "@/shared/UI";
import { ordersService } from "@/api";
import EmptyData from "@/pages/ProfilePage/components/EmptyData/EmptyData";
import Preloader from "@/shared/Preloader/Preloader";
// import { MyPagination } from "@/shared/UI";

const FavouritesOrders: React.FC = () => {
  const [orders, setOrders] = useState<IOrdersList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // const [totalOrders, setTotalOrders] = useState<number>(0);
  // const [page, setPage] = useState<number>(1);
  // const ORDERS_LIMIT = 12;
  const reversedOrders = orders?.filter((task) => task.is_published).reverse();

  function filterOrders(id: number) {
    const updatedItems = orders.filter((item) => item.id !== id);
    setOrders(updatedItems);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await ordersService.getFavouritedOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [reversedOrders.length]);

  return (
    <StyledEngineProvider injectFirst>
      <Box className="customersOrders">
        {isLoading ? (
          <Box className="favouritedCases__preloader">
            <Preloader></Preloader>
          </Box>
        ) : reversedOrders.length > 0 ? (
          <Grid xs={9} item className="customersOrders__cards">
            {reversedOrders.map((item) => (
              <MyOrdersCard
                filterFavouritedOrders={filterOrders}
                key={item.id}
                order={item}
              />
            ))}
          </Grid>
        ) : (
          <EmptyData title="Нет избранных заказов" />
        )}
      </Box>
      {/* {totalOrders > 12 && (
        <div>
          <MyPagination
            totalItems={totalOrders}
            setPage={setPage}
            page={page}
            limit={ORDERS_LIMIT}
          />
        </div> 
      )}*/}
    </StyledEngineProvider>
  );
};

export default FavouritesOrders;
