import "./DesignersResponsedCards.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IOrdersList } from "@/types";
import { useState, useEffect } from "react";
import { MyOrdersCard } from "@/shared/UI";
import { ordersService } from "@/api";
import { EmptyData } from "../../ProfilePage/components/index";
import { MyPagination } from "@/shared/UI";

const DesignersResponsedCards: React.FC = () => {
  const [orders, setOrders] = useState<IOrdersList[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const ORDERS_LIMIT = 8;
  const respondedTasks = orders.filter((task) => task.is_responded_order);

  function refreshOrdersList(id: number) {
    const newData = orders.filter((element) => element.id !== id);
    setOrders(newData);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await ordersService.getOrdersListWithoutParams();
        setOrders(ordersData.results);
        setTotalOrders(respondedTasks.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [respondedTasks.length]);

  return (
    <StyledEngineProvider injectFirst>
      <Box className="customersOrders">
        {respondedTasks.length > 0 ? (
          <Grid xs={9} item className="customersOrders__cards">
            {respondedTasks.map((item) => (
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
      {respondedTasks?.length > 0 && (
        <div>
          <MyPagination
            totalItems={totalOrders}
            setPage={setPage}
            page={page}
            limit={ORDERS_LIMIT}
          />
        </div>
      )}
    </StyledEngineProvider>
  );
};

export default DesignersResponsedCards;
