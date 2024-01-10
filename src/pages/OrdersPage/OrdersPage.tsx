import classes from "./OrdersPage.module.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IOrdersList } from "@/types";
import { useState, useEffect } from "react";
import { OrdersFilters } from "./components";
import { MyOrdersCard, MyMessagePopup } from "@/shared/UI";
import { ordersService } from "@/api";
import Preloader from "@/shared/Preloader/Preloader";
import { EmptyData } from "../ProfilePage/components";
import MyPagination from "@/shared/UI/MyPagination/MyPagination";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<IOrdersList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const ORDERS_LIMIT = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const ordersData = await ordersService.getOrdersList(
          ORDERS_LIMIT,
          page
        );
        setOrders(ordersData.results);
        setTotalOrders(ordersData.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePopupClose() {
    setOpenPopup(false);
  }

  function handlePopupOpen() {
    setOpenPopup(true);
  }

  return (
    <StyledEngineProvider injectFirst>
      <Box component="main" className={classes.ordersPage}>
        <Box className={classes.ordersPage__container}>
          <Grid
            container
            columns={2}
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            wrap="nowrap"
            className={classes.ordersPage__grid}
          >
            {isLoading ? (
              <Preloader></Preloader>
            ) : orders?.length > 0 ? (
              <Grid xs={9} item className={classes.ordersPage__cards}>
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
            <Grid xs={3} item className={classes.ordersPage__filters}>
              <OrdersFilters
                setOrders={setOrders}
                orders={orders}
                page={page}
                setTotalOrders={setTotalOrders}
                limit={ORDERS_LIMIT}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      {orders?.length > 0 && (
        <div className={classes.pagination}>
          <MyPagination
            totalItems={totalOrders}
            setPage={setPage}
            page={page}
            limit={ORDERS_LIMIT}
          />
        </div>
      )}
      {openPopup ? (
        <MyMessagePopup open={openPopup} onClose={handlePopupClose} />
      ) : null}
    </StyledEngineProvider>
  );
};

export default OrdersPage;
