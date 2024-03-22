import { Box, Grid, StyledEngineProvider } from "@mui/material";
import "./Mysubscriptions.scss";
import { IUserSubscriber } from "@/types";
import { useState, useEffect } from "react";
import subscriptionsService from "@/api/services/subscriptionservice";
import { EmptyData } from "../../../ProfilePage/components/index";
import UserCard from "../UserCard/UserCard";
import Preloader from "@/shared/Preloader/Preloader";

//import { MyPagination } from "@/shared/UI";

const MySubscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<IUserSubscriber[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subsData = await subscriptionsService.getSubscriptions();
        setSubscriptions(subsData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Box className="subscriptions">
        {isLoading ? (
          <Box className="subscriptions__preloader">
            <Preloader></Preloader>
          </Box>
        ) : subscriptions.length > 0 ? (
          <Grid xs={9} item className="subscriptions__cards">
            {subscriptions.reverse().map((item) => (
              <UserCard
                key={item.id}
                user={item}
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
                page={"my-subscriptions"}
              />
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

export default MySubscriptions;
