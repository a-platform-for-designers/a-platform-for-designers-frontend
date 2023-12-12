import { Avatar, Box, StyledEngineProvider, Typography } from "@mui/material";
import "./DesignersCard.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import MySwiper from "@/shared/UI/MySwiper/MySwiper";
import { IUserWithLastCases } from "@/types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/reduxHooks";
import { MessagePopup } from "@/pages/OrdersPage/components";
import { useState } from "react";

interface IProps {
  cardOwner: IUserWithLastCases;
}

const DesignersCard: React.FC<IProps> = ({ cardOwner }) => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.auth);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  function setSpecializations(): string[] {
    const name: string = "name";
    const arr = cardOwner.specialization?.map(
      (obj) => obj[name as keyof typeof obj]
    );
    if (arr) {
      return arr.filter((item) => item !== "Менторство");
    }
    return arr;
  }

  function handleClick() {
    if (isAuth) {
      setOpenPopup(true);
    }
  }

  function handlePopupClose() {
    setOpenPopup(false);
  }

  return (
    <StyledEngineProvider injectFirst>
      <Box className="designersCard">
        <div className="designersCard__info">
          <div
            className="designersCard__infoData"
            onClick={() => {
              navigate(`/profile/${cardOwner.id}/`);
            }}
          >
            <Avatar
              className="designersCard__avatar"
              src={cardOwner.photo}
              sx={{ backgroundColor: "#4F378B", color: "#EADDFF" }}
            >{`${cardOwner?.first_name[0]}${cardOwner?.last_name[0]}`}</Avatar>
            <Typography component="h2" className="designersCard__name">
              {cardOwner.first_name} {cardOwner.last_name}
            </Typography>
            <Typography paragraph className="designersCard__job">
              {setSpecializations() && setSpecializations().join(", ")}
            </Typography>
            <Typography paragraph className="designersCard__country">
              {cardOwner?.country}
            </Typography>
          </div>
          <div>
            <MyButton
              variant="outlined"
              onClick={() => {
                handleClick();
              }}
            >
              Написать
            </MyButton>
          </div>
        </div>
        {cardOwner.last_cases.map((item) => (
          <MySwiper
            key={item.id}
            item={item}
            onClick={() => navigate(`/case/${item.id}`)}
          />
        ))}
      </Box>
      {openPopup ? (
        <MessagePopup open={openPopup} onClose={handlePopupClose} />
      ) : null}
    </StyledEngineProvider>
  );
};

export default DesignersCard;
