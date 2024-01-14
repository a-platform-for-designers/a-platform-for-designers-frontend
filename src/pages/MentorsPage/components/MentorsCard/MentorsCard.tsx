import { Avatar, Box, Typography, StyledEngineProvider } from "@mui/material";
import "./MentorsCard.scss";
import MyButton from "@/shared/UI/MyButton/MyButton";
import { IUserWithLastCases } from "@/types";
import { useNavigate } from "react-router-dom";
import SkillsItem from "../SkillsItem/SkillsItem";
import { Grid } from "@mui/material";

interface IProps {
  user: IUserWithLastCases;
}

const MentorsCard: React.FC<IProps> = ({ user }) => {
  const navigate = useNavigate();
  const skills = user.mentoring?.skills;

  function setSkills() {
    if (Array.isArray(skills)) {
      const name: string = "name";
      const result = skills.map((obj) => String(obj[name as keyof typeof obj]));
      return result;
    }
  }

  return (
    <StyledEngineProvider injectFirst>
      <Box className="mentorsCard">
        <Box>
          <Avatar
            onClick={() => {
              navigate(`/profile/${user.id}/`);
            }}
            className="mentorsCard__avatar"
            src={user.photo}
            sx={{ backgroundColor: "#4F378B", color: "#EADDFF" }}
          >
            {`${user?.first_name[0]}${user?.last_name[0]}`}
          </Avatar>
          <MyButton variant="outlined" onClick={() => {}}>
            Написать
          </MyButton>
        </Box>
        <Box className="mentorsCard__info">
          <Box className="mentorsCard__info__text">
            <Box className="mentorsCard__info__text__about">
              <Typography component="h2" className="mentorsCard__name">
                {user?.first_name} {user?.last_name}
              </Typography>
              <Typography paragraph className="mentorsCard__country">
                {user?.country}
              </Typography>
              <Typography paragraph className="mentorsCard__job">
                {user?.mentoring?.experience}
              </Typography>
              <Box className="mentorsCard__price">
                {user?.mentoring?.price ? (
                  <>
                    {user?.mentoring?.price} ₽
                    <Typography paragraph className="mentorsCard__price_black">
                      /час
                    </Typography>
                  </>
                ) : user?.mentoring?.agreement_free ? (
                  "По договоренности"
                ) : (
                  "Бесплатно"
                )}
              </Box>
            </Box>
            <Box>
              <Typography paragraph className="mentorsCard__expertise">
                {user?.mentoring?.expertise}
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
    </StyledEngineProvider>
  );
};

export default MentorsCard;
