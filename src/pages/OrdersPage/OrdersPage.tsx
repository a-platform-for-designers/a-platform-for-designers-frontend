import "./OrdersPage.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IOrdersList } from "@/types";
import { useState, useEffect } from "react";
import { OrdersFilters } from "./components";
import { MyOrdersCard, MyMessagePopup } from "@/shared/UI";
import { ordersService } from "@/api";
import Preloader from "@/shared/Preloader/Preloader";
import { EmptyData } from "../ProfilePage/components";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<IOrdersList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const ordersData = await ordersService.getOrdersList();
        setOrders(ordersData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function handlePopupClose() {
    setOpenPopup(false);
  }

  function handlePopupOpen() {
    setOpenPopup(true);
  }

  return (
    <StyledEngineProvider injectFirst>
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
            className="designersPage__grid"
          >
            {isLoading ? (
              <Preloader></Preloader>
            ) : orders.length > 0 ? (
              <Grid xs={9} item className="ordersPage__cards">
                {orders.map((item) => (
                  <MyOrdersCard
                    openPopup={handlePopupOpen}
                    key={item.id}
                    order={item}
                  />
                ))}
              </Grid>
            ) : (
              <EmptyData title="На сайте пока нет заказов" />
            )}
            <Grid xs={3} item className="designersPage__filters">
              <OrdersFilters setOrders={setOrders} orders={orders} />
            </Grid>
          </Grid>
        </Box>
      </Box>
      {openPopup ? (
        <MyMessagePopup open={openPopup} onClose={handlePopupClose} />
      ) : null}
    </StyledEngineProvider>
  );
};

export default OrdersPage;
