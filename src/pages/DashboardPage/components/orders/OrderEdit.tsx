import { StyledEngineProvider } from "@mui/material";
import { useParams } from "react-router-dom";
import { IOrderInfoResponse } from "@/types";
import { useState, useEffect } from "react";
import { ordersService } from "@/api";
import OrderCreation from "./OrderCreation";
import Preloader from "@/shared/Preloader/Preloader";

const OrderEdit: React.FC = () => {
  const { id } = useParams();
  const [orderInfo, setOrderInfo] = useState<IOrderInfoResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const ordersData = await ordersService.getOrderInfo(Number(id));
        setOrderInfo(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <StyledEngineProvider injectFirst>
      {isLoading ? <Preloader /> : <OrderCreation orderInfo={orderInfo} />}
    </StyledEngineProvider>
  );
};

export default OrderEdit;
