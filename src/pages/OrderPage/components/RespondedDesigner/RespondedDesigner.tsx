import { Avatar, Box, Typography } from "@mui/material";
import "./RespondedDesigner.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import { IApplicant } from "@/types";
import { useNavigate } from "react-router-dom";

interface IProps {
  designer: IApplicant;
  handlePopupOpen: () => void;
}

const RespondedDesigner: React.FC<IProps> = ({ designer, handlePopupOpen }) => {
  const navigate = useNavigate();

  return (
    <Box className="respondedDesigner">
      <Avatar
        className="respondedDesigner__avatar"
        src={designer.photo}
        onClick={() => {
          navigate(`/profile/${designer.id}/portfolio`);
        }}
      />
      <Typography component="p" className="respondedDesigner__name">
        {designer.first_name} {designer.last_name}
      </Typography>
      {designer.specialization ? (
        <Typography component="p" className="respondedDesigner__info">
          {designer.specialization?.name}
        </Typography>
      ) : null}
      <Typography component="p" className="respondedDesigner__info">
        {designer?.country}
      </Typography>
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
