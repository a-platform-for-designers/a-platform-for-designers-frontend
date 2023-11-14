import {
  Container,
  Grid,
  ImageList,
  ImageListItem,
  StyledEngineProvider,
} from "@mui/material";
import "./CasePage.scss";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { casesService } from "../../api";
import { ICase } from "../../types";
import { ActionButton, CaseInfo, ProfileInfo } from "./components";
import { AboutItem } from "../ProfilePage/components";
import Preloader from "../../components/Preloader/Preloader";
import { currentUserInfo } from "@/utils/constants";

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
  title: "Магический дизайн: создание удивительных веб-сайтов",
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
      src: "https://scientificrussia.ru/images/b/teb-full.jpg",
    },
    {
      id: 2,
      src: "https://fond-vsem-mirom.ru/wp-content/uploads/2020/06/gk_zdhbg784.jpg",
    },
    {
      id: 3,
      src: "https://oir.mobi/uploads/posts/2022-09/1662133482_1-oir-mobi-p-britanskaya-pryamoukhaya-koshka-krasivo-1.jpg",
    },
    {
      id: 4,
      src: "https://koshka.top/uploads/posts/2021-12/1638880950_1-koshka-top-p-britanskaya-golubaya-visloukhaya-1.jpg",
    },
  ],
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
          <ProfileInfo data={currentUserInfo} />
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
