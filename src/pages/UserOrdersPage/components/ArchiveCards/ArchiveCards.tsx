import "./ArchiveCards.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IMyOrderResponse } from "@/types";
import { useState, useEffect } from "react";
import ArchiveCard from "../ArchiveCard/ArchiveCard";
import { ordersService } from "@/api";
import { EmptyData } from "../../../ProfilePage/components/index";
import { MyPagination } from "@/shared/UI";

const ArchiveCards: React.FC = () => {
  const [orders, setOrders] = useState<IMyOrderResponse[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const ORDERS_LIMIT = 8;
  const archiveLocation = location.pathname.endsWith("/my-orders/archive");
  const filteredOrders = orders?.filter((task) => !task.is_published);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await ordersService.getMyOrdersListWithoutParams();
        setOrders(ordersData);
        setTotalOrders(filteredOrders.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [filteredOrders.length]);

  function refreshOrdersList(id: number) {
    const newData = orders?.filter((element) => element.id !== id);
    setOrders(newData);
  }

  return (
    <StyledEngineProvider injectFirst>
      <Box className="customersOrders">
        {filteredOrders.length > 0 ? (
          <Grid xs={9} item className="customersOrders__cards">
            {filteredOrders.map((item) => (
              <ArchiveCard
                refreshOrdersList={refreshOrdersList}
                key={item.id}
                order={item}
              />
            ))}
          </Grid>
        ) : (
          <EmptyData
            title={
              archiveLocation ? "Нет заказов в архиве" : "Нет активных заказов"
            }
          />
        )}
      </Box>
      {filteredOrders?.length > 0 && (
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

export default ArchiveCards;
