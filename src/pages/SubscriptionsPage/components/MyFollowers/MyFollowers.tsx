import "../../../UserOrdersPage/components/ArchiveCards/ArchiveCards.scss";
import { Box, Grid, StyledEngineProvider } from "@mui/material";
import { IUserSubscriber } from "@/types";
import { useState, useEffect } from "react";
import subscriptionsService from "@/api/services/subscriptionservice";
import { EmptyData } from "../../../ProfilePage/components/index";
import UserCard from "../UserCard/UserCard";
//import { MyPagination } from "@/shared/UI";

const MyFollowers: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<IUserSubscriber[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subsData = await subscriptionsService.getSubscriptions();
        setSubscriptions(subsData);
        console.log(subsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Box className="customersOrders">
        {subscriptions.length > 0 ? (
          <Grid xs={9} item className="customersOrders__cards">
            {subscriptions.map((item) => (
              <UserCard user={item} />
            ))}
          </Grid>
        ) : (
          <EmptyData title={"Нет подписок"} />
        )}
      </Box>
      {/* {totalOrders > 7 && (
        <div>
          <MyPagination
            totalItems={totalOrders}
            setPage={setPage}
            page={page}
            limit={ORDERS_LIMIT}
          />
        </div>
      )} */}
    </StyledEngineProvider>
  );
};

export default MyFollowers;
