import "./CustomersOrdersCards.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { useParams } from "react-router-dom";
import { IMyOrderResponse } from "@/types";
import { useState, useEffect } from "react";
import { MyOrdersCard } from "@/shared/UI";
import { ordersService } from "../../../../api";
import EmptyData from "../EmptyData/EmptyData";
// import { MyPagination } from "@/shared/UI";

const CustomersOrdersCards: React.FC = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState<IMyOrderResponse[]>();
  const filteredItems = orders?.filter(
    (item) => item.customer.id === Number(id)
  );
  const filteredOrders = filteredItems?.filter((task) => task.is_published);

  // const [totalOrders, setTotalOrders] = useState<number>(0);
  // const [page, setPage] = useState<number>(1);
  // const ORDERS_LIMIT = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await ordersService.getOrdersListWithoutParams();
        setOrders(ordersData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      {filteredOrders && (
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
      )}
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

export default CustomersOrdersCards;
