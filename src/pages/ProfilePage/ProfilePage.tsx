import { Container, StyledEngineProvider } from "@mui/material";
import "./ProfilePage.scss";
import Info, { IProfileData } from "./components/Info/Info";

import profilePlaceholder from "../../assets/images/designerscarousel-avatar.png";

const ProfilePage: React.FC = () => {
  const profileData: IProfileData = {
    name: "Ирина Петрова",
    specialization: "Графический дизайнер",
    image: profilePlaceholder,
    country: "Россия",
    registrationDate: "12 ноября 2023",
    status: "Ищет заказы",
    likes: 1001,
    followers: 98,
  };

  return (
    <StyledEngineProvider injectFirst>
      <Container component="section">
        <Info data={profileData} />
      </Container>
    </StyledEngineProvider>
  );
};

export default ProfilePage;
