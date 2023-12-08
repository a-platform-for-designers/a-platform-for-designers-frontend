import "./OrdersPage.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IOrdersList, IUserInfo } from "@/types";
import { useState, useEffect } from "react";
import { OrdersFilters, OrdersCard, MessagePopup } from "./components";
import { ordersService } from "../../api";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<IOrdersList[]>([]);

  useEffect(() => {
    (async () => {
      const ordersData = await ordersService.getOrdersList();
      setOrders(ordersData.results);
    })();
  }, []);

  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>();

  function handlePopupClose() {
    setOpenPopup(false);
  }

  function handlePopupOpen(userInfo: IUserInfo) {
    setUserInfo(userInfo);
    setOpenPopup(true);
  }

  return (
    <StyledEngineProvider injectFirst>
      <Box component="main" className="ordersPage">
        <Box className="ordersPage__container">
          <Grid
            container
            columns={2}
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            wrap="nowrap"
          >
            {orders.length > 0 && (
              <Grid className="ordersPage__cards">
                {orders.map((item) => (
                  <OrdersCard
                    openPopup={handlePopupOpen}
                    key={item.id}
                    order={item}
                  />
                ))}
              </Grid>
            )}

            <Grid xs={3} item className="orderPage__filters">
              <OrdersFilters />
            </Grid>
          </Grid>
        </Box>
      </Box>
      {openPopup ? (
        <MessagePopup
          open={openPopup}
          onClose={handlePopupClose}
          userInfo={userInfo}
        />
      ) : null}
    </StyledEngineProvider>
  );
};

export default OrdersPage;
