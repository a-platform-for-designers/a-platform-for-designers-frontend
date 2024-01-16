import "./DesignersResponsedCards.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IMyOrderResponse } from "@/types";
import { useState, useEffect } from "react";
import { MyOrdersCard } from "@/shared/UI";
import { ordersService } from "@/api";
import { EmptyData } from "../../ProfilePage/components/index";
//import { MyPagination } from "@/shared/UI";

const DesignersResponsedCards: React.FC = () => {
  const [orders, setOrders] = useState<IMyOrderResponse[]>([]);
  // const [totalOrders, setTotalOrders] = useState<number>(0);
  // const [page, setPage] = useState<number>(1);
  // const ORDERS_LIMIT = 8;
  // const respondedTasks = orders.filter((task) => task.is_responded_order);
  const filteredOrders = orders?.filter((task) => task.is_published);

  function refreshOrdersList(id: number) {
    const newData = orders.filter((element) => element.id !== id);
    setOrders(newData);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await ordersService.getMyOrdersListWithoutParams();
        setOrders(ordersData);
        //setTotalOrders(ordersData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [orders.length]);

  return (
    <StyledEngineProvider injectFirst>
      <Box className="customersOrders">
        {filteredOrders.length > 0 ? (
          <Grid xs={9} item className="customersOrders__cards">
            {filteredOrders.map((item) => (
              <MyOrdersCard
                refreshOrdersList={refreshOrdersList}
                key={item.id}
                order={item}
              />
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
      )} */}
    </StyledEngineProvider>
  );
};

export default DesignersResponsedCards;
