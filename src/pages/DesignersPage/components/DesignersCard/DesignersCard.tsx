import { Avatar, Box, StyledEngineProvider, Typography } from "@mui/material";
import "./DesignersCard.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import MySwiper from "@/shared/UI/MySwiper/MySwiper";
import { IUserWithLastCases } from "@/types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/reduxHooks";
import emptyCase from "@/assets/images/caseCart.webp";
import { showMessagePopUp } from "@/redux/slices/chatSlice";

interface IProps {
  cardOwner: IUserWithLastCases;
}

const DesignersCard: React.FC<IProps> = ({ cardOwner }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
                dispatch(showMessagePopUp(cardOwner.id));
              }}
            >
              Написать
            </MyButton>
          </div>
        </div>
        {cardOwner.last_cases.length < 2 ? (
          <>
            <MySwiper
              item={cardOwner.last_cases[0]}
              onClick={() => navigate(`/case/${cardOwner.last_cases[0].id}`)}
            />
            <img src={emptyCase} alt="Нет кейса" />
          </>
        ) : (
          cardOwner.last_cases.map((item) => (
            <MySwiper
              key={item.id}
              item={item}
              onClick={() => navigate(`/case/${item.id}`)}
            />
          ))
        )}
      </Box>
    </StyledEngineProvider>
  );
};

export default DesignersCard;
