import "./OrdersPage.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IOrderDataItem } from "@/types";
import { OrdersFilters, OrdersCard } from "./components";

const OrdersPage: React.FC = () => {
  // временно, пока нет данных с сервера
  const orders: IOrderDataItem[] = [
    {
      id: 1002,
      photo: null,
      first_name: "Иван",
      last_name: "Петров",
      title: "Создание сайта",
      description:
        "Создания сайта для магазина одежды для магазина одежды магазина одежды для магазина одежды для магазина",
      price: 1000,
      specialization: "Веб дизайнер",
      sphere: "Коммерция",
    },
    {
      id: 1003,
      photo: null,
      first_name: "Иван",
      last_name: "Петров",
      title: "Создание сайта",
      description:
        "Создания сайта для магазина одежды для магазина одежды магазина одежды для магазина одежды для магазина",
      price: 1000,
      specialization: "Веб дизайнер",
      sphere: "Коммерция",
    },
    {
      id: 1004,
      photo: null,
      first_name: "Иван",
      last_name: "Петров",
      title: "Создание сайта",
      description:
        "Создания сайта для магазина одежды для магазина одежды магазина одежды для магазина одежды для магазина Создания сайта для магазина одежды для магазина одежды магазина одежды для магазина одежды для магазина",
      price: 1000,
      specialization: "Веб дизайнер",
      sphere: "Коммерция",
    },
    {
      id: 1005,
      photo: null,
      first_name: "Иван",
      last_name: "Петров",
      title: "Создание сайта",
      description:
        "Создания сайта для магазина одежды для магазина одежды магазина одежды для магазина одежды для магазина",
      price: 1000,
      specialization: "Веб дизайнер",
      sphere: "Коммерция",
    },
  ];

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
              <Grid xs={9} item className="ordersPage__cards">
                {orders.map((item) => (
                  <OrdersCard key={item.id} order={item} />
                ))}
              </Grid>
            )}

            <Grid xs={3} item className="orderPage__filters">
              <OrdersFilters />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </StyledEngineProvider>
  );
};

export default OrdersPage;
