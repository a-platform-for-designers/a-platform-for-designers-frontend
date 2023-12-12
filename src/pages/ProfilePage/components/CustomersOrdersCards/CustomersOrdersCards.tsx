import "./CustomersOrdersCards.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IOrdersList, IUserInfo } from "@/types";
import { useState, useEffect } from "react";
import { OrdersCard, MessagePopup } from "../../../OrdersPage/components";
import { ordersService } from "../../../../api";
import { EmptyData } from "..";

interface IProps {
  userId?: number;
}

const CustomersOrdersCards: React.FC<IProps> = ({ userId }) => {
  const [orders, setOrders] = useState<IOrdersList[]>([]);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const filteredItems = orders.filter((item) => item.customer.id === userId);
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

  console.log(userInfo);

  function handlePopupOpen(userInfo: IUserInfo) {
    setUserInfo(userInfo);
    setOpenPopup(true);
  }

  return (
    <StyledEngineProvider injectFirst>
      <Box className="customersOrders">
        {filteredItems.length > 0 ? (
          <Grid xs={9} item className="customersOrders__cards">
            {filteredItems.map((item) => (
              <OrdersCard
                openPopup={handlePopupOpen}
                key={item.id}
                order={item}
              />
            ))}
          </Grid>
        ) : (
          <EmptyData title="Нет активных заказов" />
        )}
      </Box>
      {openPopup ? (
        <MessagePopup open={openPopup} onClose={handlePopupClose} />
      ) : null}
    </StyledEngineProvider>
  );
};

export default CustomersOrdersCards;
