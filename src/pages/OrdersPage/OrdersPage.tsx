import "./OrdersPage.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IOrdersList, IUserInfo } from "@/types";
import { useState, useEffect } from "react";
import { OrdersFilters, OrdersCard, MessagePopup } from "./components";
import { ordersService } from "../../api";
import Preloader from "../../shared/Preloader/Preloader";
import { EmptyData } from "../ProfilePage/components";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<IOrdersList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>();

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

  function handlePopupOpen(userInfo: IUserInfo) {
    setUserInfo(userInfo);
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
                  <OrdersCard
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
              <OrdersFilters setOrders={setOrders} />
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
