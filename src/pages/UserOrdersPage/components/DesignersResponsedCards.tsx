import "./DesignersResponsedCards.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IOrdersList } from "@/types";
import { useState, useEffect } from "react";
import { MyOrdersCard, MyMessagePopup } from "@/shared/UI";
import { ordersService } from "@/api";
import { EmptyData } from "../../ProfilePage/components/index";

const DesignersResponsedCards: React.FC = () => {
  const [orders, setOrders] = useState<IOrdersList[]>([]);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const respondedTasks = orders.filter((task) => task.is_responded_order);

  function refreshOrdersList(id: number) {
    const newData = orders.filter((element) => element.id !== id);
    setOrders(newData);
  }

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
        {respondedTasks.length > 0 ? (
          <Grid xs={9} item className="customersOrders__cards">
            {respondedTasks.map((item) => (
              <MyOrdersCard
                refreshOrdersList={refreshOrdersList}
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

export default DesignersResponsedCards;
