import { Avatar, Box, Typography } from "@mui/material";
import "./RespondedDesigner.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import { IApplicant } from "@/types";
import { useNavigate } from "react-router-dom";
import { showMessagePopUp } from "@/redux/slices/chatSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

interface IProps {
  designer: IApplicant;
  setOpenSignInPopup: (boolean: boolean) => void;
}

const RespondedDesigner: React.FC<IProps> = ({
  designer,
  setOpenSignInPopup,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handlePopupOpen() {
    if (designer) {
      dispatch(showMessagePopUp(designer));
    } else {
      setOpenSignInPopup(true);
    }
  }

  function setSpecializations(): string[] {
    const name: string = "name";
    const arr = designer.specialization?.map(
      (obj) => obj[name as keyof typeof obj]
    );
    if (arr) {
      return arr.filter((item) => item !== "Менторство");
    }
    return arr;
  }

  return (
    <Box className="respondedDesigner">
      <Avatar
        className="respondedDesigner__avatar"
        src={designer.photo}
        onClick={() => {
          navigate(`/profile/${designer.id}/portfolio`);
        }}
      />
      <div className="respondedDesigner__text-info">
        <Typography component="p" className="respondedDesigner__name">
          {designer.first_name} {designer.last_name}
        </Typography>
        {designer.specialization && (
          <Typography component="p" className="respondedDesigner__info">
            {setSpecializations() && setSpecializations().join(", ")}
          </Typography>
        )}
        <Typography component="p" className="respondedDesigner__info">
          {designer?.country}
        </Typography>
      </div>
      <MyButton
        type="button"
        variant="outlined"
        size="large"
        onClick={handlePopupOpen}
        className="orderPage__button"
      >
        Написать
      </MyButton>
    </Box>
  );
};

export default RespondedDesigner;
