import "./CustomersOrdersCards.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IOrdersList, IUserInfo } from "@/types";
import { useState, useEffect } from "react";
import { OrdersCard, MessagePopup } from "../../../OrdersPage/components";
import { ordersService } from "../../../../api";
import { EmptyData } from "..";

const CustomersOrdersCards: React.FC = () => {
  const [orders, setOrders] = useState<IOrdersList[]>([]);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await ordersService.getOrdersList();
        setOrders(ordersData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      <Box className="customersOrders">
        {orders.length > 0 ? (
          <Grid xs={9} item className="customersOrders__cards">
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

export default CustomersOrdersCards;
