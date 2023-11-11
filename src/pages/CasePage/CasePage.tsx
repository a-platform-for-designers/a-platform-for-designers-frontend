import {
  Container,
  Grid,
  ImageList,
  ImageListItem,
  StyledEngineProvider,
} from "@mui/material";
import "./CasePage.scss";
import profilePlaceholder from "../../assets/images/designerscarousel-avatar.png";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { casesService } from "../../api";
import { ICase } from "../../types";
import { IProfileData } from "../ProfilePage/components/Info/Info";
import { ActionButton, CaseInfo, ProfileInfo } from "./components";
import { AboutItem } from "../ProfilePage/components";
import Preloader from "../../components/Preloader/Preloader";

const casePlaceholder: ICase = {
  id: 1,
  skills: [
    { id: 1, name: "Коммерческая иллюстраци" },
    { id: 2, name: "Персонажи" },
    { id: 3, name: "Афиши" },
    { id: 4, name: "Леттеринг" },
    { id: 5, name: "Книжная иллюстрация" },
  ],
  author: 1,
  title: "Название проекта Название проекта",
  sphere: "Маркетинг",
  instruments: [
    { id: 1, name: "Photoshop" },
    { id: 2, name: "Illustrator" },
    { id: 3, name: "Figma" },
  ],
  working_term: 1,
  description:
    "Say hello to the fresh new face of JENЁK! 💚 Mixing chic sophistication with an effortless attitude, this brand makeover captures the versatile spirit of the beloved bags.",
  is_favorited: true,
  is_liked: true,
  images: [
    {
      id: 1,
      src: "https://w3layouts.com/wp-content/uploads/2015/10/misal.jpg",
    },
    {
      id: 2,
      src: "https://assets.website-files.com/62c5836076839ad95e36215d/647de080c579ff6909b927e8_Fjm_lk4VsAE1STW.jpg",
    },
    {
      id: 3,
      src: "https://mir-s3-cdn-cf.behance.net/projects/original/fbe6f858048473.Y3JvcCwxMzA1LDEwMjEsMzEwLDA.png",
    },
    {
      id: 4,
      src: "https://sun9-16.userapi.com/impf/JriVWQBPQBkc-_t79xr3kInESPirBxWzPX5xyA/udUUT5QY7Ww.jpg?size=320x228&quality=96&sign=65925dbca0c14aa6bf04db411409a19a&c_uniq_tag=6kFduF8FPH7vNc4aKrIlfa6U9i6-36BIhIgtrDfOJng&type=album",
    },
  ],
};

const profileData: IProfileData = {
  first_name: "Екатерина",
  last_name: "Барановская",
  specialization: "Графический дизайнер",
  image: profilePlaceholder,
  country: "Россия",
  registrationDate: "12 ноября 2023",
  status: "Ищет заказы",
  likes: 1001,
  followers: 98,
};

const CasePage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [caseData, setCaseData] = useState<ICase>(casePlaceholder);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      casesService
        .getCaseById(Number(id))
        .then((res) => {
          setCaseData(res);
        })
        .catch(console.log)
        .finally(() => {
          console.log("finally in case page");
          // имитация задержки
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    }
  }, [id]);

  if (isLoading) {
    return (
      <StyledEngineProvider injectFirst>
        <Container component="section" className="casePage casePage_preloader">
          <Preloader />
        </Container>
      </StyledEngineProvider>
    );
  }

  return (
    <StyledEngineProvider injectFirst>
      <Container component="section" className="casePage">
        <Grid
          container
          className="casePage__aside"
          gap="40px"
          alignItems="flex-start"
        >
          <ProfileInfo data={profileData} />
          <CaseInfo data={casePlaceholder} />
          <Grid
            container
            gap="28px"
            alignItems="center"
            justifyContent="flex-start"
            wrap="nowrap"
          >
            <ActionButton
              active={isLiked}
              onClick={() => setIsLiked(!isLiked)}
            />
            <ActionButton
              active={isFavorite}
              onClick={() => setIsFavorite(!isFavorite)}
              variant="favorite"
            />
          </Grid>
        </Grid>
        <Grid container className="casePage__content" gap="40px">
          <ImageList className="casePage__image-list" cols={2} gap={60}>
            {caseData.images.map((item) => (
              <ImageListItem key={item.id}>
                <img
                  className="casePage__image-item"
                  srcSet={`${item.src}`}
                  src={`${item.src}`}
                  alt={`Изображение #${item.id}`}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <AboutItem title="Инструменты" data={caseData.instruments} />
        </Grid>
      </Container>
    </StyledEngineProvider>
  );
};

export default CasePage;
