import "./CustomersOrdersCards.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IOrdersList } from "@/types";
import { useState, useEffect } from "react";
import { MyOrdersCard, MyMessagePopup } from "@/shared/UI";
import { ordersService } from "../../../../api";
import { EmptyData } from "..";

interface IProps {
  userId?: number;
  myOrders?: boolean;
}

const CustomersOrdersCards: React.FC<IProps> = ({ userId }) => {
  const [orders, setOrders] = useState<IOrdersList[]>([]);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
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

  function handlePopupOpen() {
    setOpenPopup(true);
  }

  return (
    <StyledEngineProvider injectFirst>
      <Box className="customersOrders">
        {filteredItems.length > 0 ? (
          <Grid xs={9} item className="customersOrders__cards">
            {filteredItems.map((item) => (
              <MyOrdersCard
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
        <MyMessagePopup open={openPopup} onClose={handlePopupClose} />
      ) : null}
    </StyledEngineProvider>
  );
};

export default CustomersOrdersCards;
