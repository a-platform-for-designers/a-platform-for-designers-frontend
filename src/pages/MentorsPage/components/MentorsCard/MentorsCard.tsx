import { Avatar, Box, Typography, StyledEngineProvider } from "@mui/material";
import "./MentorsCard.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import { IUserWithLastCases } from "@/types";
import { useNavigate } from "react-router-dom";
import SkillsItem from "../SkillsItem/SkillsItem";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { showMessagePopUp } from "@/redux/slices/chatSlice";
import MySignInPopup from "@/shared/UI/MySignInPopup/MySignInPopup";
import { useState } from "react";

interface IProps {
  mentor: IUserWithLastCases;
}

const MentorsCard: React.FC<IProps> = ({ mentor }) => {
  const { user } = useAppSelector((state) => state.user); // авторизованный пользователь
  const navigate = useNavigate();
  const skills = mentor.mentoring?.skills;
  const dispatch = useAppDispatch();

  const [openSignInPopup, setOpenSignInPopup] = useState<boolean>(false);

  function setSkills() {
    if (Array.isArray(skills)) {
      const name: string = "name";
      const result = skills.map((obj) => String(obj[name as keyof typeof obj]));
      return result;
    }
  }

  function handlePopupOpen() {
    if (user) {
      dispatch(showMessagePopUp(mentor.id));
    } else {
      setOpenSignInPopup(true);
    }
  }

  return (
    <StyledEngineProvider injectFirst>
      <Box className="mentorsCard">
        <Box>
          <Avatar
            onClick={() => {
              navigate(`/profile/${mentor.id}/`);
            }}
            className="mentorsCard__avatar"
            src={mentor.photo}
            sx={{ backgroundColor: "#4F378B", color: "#EADDFF" }}
          >
            {`${mentor?.first_name[0]}${mentor?.last_name[0]}`}
          </Avatar>
          <MyButton variant="outlined" onClick={handlePopupOpen}>
            Написать
          </MyButton>
        </Box>
        <Box className="mentorsCard__info">
          <Box className="mentorsCard__info__text">
            <Box className="mentorsCard__info__text__about">
              <Typography component="h2" className="mentorsCard__name">
                {mentor?.first_name} {mentor?.last_name}
              </Typography>
              <Typography paragraph className="mentorsCard__country">
                {mentor?.country}
              </Typography>
              <Typography paragraph className="mentorsCard__job">
                {mentor?.mentoring?.experience}
              </Typography>
              <Box className="mentorsCard__price">
                {mentor?.mentoring?.price ? (
                  <>
                    {mentor?.mentoring?.price} ₽
                    <Typography paragraph className="mentorsCard__price_black">
                      /час
                    </Typography>
                  </>
                ) : mentor?.mentoring?.agreement_free ? (
                  "По договоренности"
                ) : (
                  "Бесплатно"
                )}
              </Box>
            </Box>
            <Box>
              <Typography paragraph className="mentorsCard__expertise">
                {mentor?.mentoring?.expertise}
              </Typography>
            </Box>
          </Box>
          <Box className="mentorsCard__info__skills">
            <Grid>
              <SkillsItem data={setSkills()} />
            </Grid>
          </Box>
        </Box>
      </Box>
      {openSignInPopup ? (
        <MySignInPopup setOpenSignInPopup={setOpenSignInPopup} />
      ) : null}
    </StyledEngineProvider>
  );
};

export default MentorsCard;
