import "./CustomersOrdersCards.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IOrdersList } from "@/types";
import { useState, useEffect } from "react";
import { MyOrdersCard } from "@/shared/UI";
import { ordersService } from "../../../../api";
import EmptyData from "../EmptyData/EmptyData";
import { MyPagination } from "@/shared/UI";

interface IProps {
  userId?: number;
  myOrders?: boolean;
}

const CustomersOrdersCards: React.FC<IProps> = ({ userId }) => {
  const [orders, setOrders] = useState<IOrdersList[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const ORDERS_LIMIT = 10;
  const filteredItems = orders.filter((item) => item.customer.id === userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await ordersService.getOrdersListWithoutParams();
        setOrders(ordersData.results);
        setTotalOrders(filteredItems.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [filteredItems.length]);

  return (
    <StyledEngineProvider injectFirst>
      <Box className="customersOrders">
        {filteredItems.length > 0 ? (
          <Grid xs={9} item className="customersOrders__cards">
            {filteredItems.map((item) => (
              <MyOrdersCard key={item.id} order={item} />
            ))}
          </Grid>
        ) : (
          <EmptyData title="Нет активных заказов" />
        )}
      </Box>
      {filteredItems?.length > 0 && (
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

export default CustomersOrdersCards;
