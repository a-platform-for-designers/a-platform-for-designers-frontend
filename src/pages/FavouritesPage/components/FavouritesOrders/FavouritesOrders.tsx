import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IOrdersList } from "@/types";
import { useState, useEffect } from "react";
import { MyOrdersCard } from "@/shared/UI";
import { ordersService } from "@/api";
import EmptyData from "@/pages/ProfilePage/components/EmptyData/EmptyData";
// import { MyPagination } from "@/shared/UI";

// TODO настроить пагинацию

const FavouritesOrders: React.FC = () => {
  const [orders, setOrders] = useState<IOrdersList[]>([]);
  // const [totalOrders, setTotalOrders] = useState<number>(0);
  // const [page, setPage] = useState<number>(1);
  // const ORDERS_LIMIT = 8;
  // const filteredItems = orders.filter((item) => item.customer.id === userId);
  const filteredOrders = orders?.filter((task) => task.is_published);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await ordersService.getFavouritedOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [filteredOrders.length]);

  return (
    <StyledEngineProvider injectFirst>
      <Box className="customersOrders">
        {filteredOrders.length > 0 ? (
          <Grid xs={9} item className="customersOrders__cards">
            {filteredOrders.map((item) => (
              <MyOrdersCard key={item.id} order={item} />
            ))}
          </Grid>
        ) : (
          <EmptyData title="Нет активных заказов" />
        )}
      </Box>
      {/* {totalOrders > 8 && (
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
