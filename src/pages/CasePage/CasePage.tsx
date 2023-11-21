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
import Preloader from "@/shared/Preloader/Preloader";

const CasePage: React.FC = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState<ICase>();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      casesService
        .getCaseById(Number(id))
        .then((res) => {
          setCaseData(res);
        })
        .catch(console.log);
    }
  }, [id]);

  const isLoading = false;
  if (isLoading) {
    return (
      <StyledEngineProvider injectFirst>
        <Container component="section" className="casePage casePage_preloader">
          <Preloader />
        </Container>
      </StyledEngineProvider>
    );
  }

  if (caseData)
    return (
      <StyledEngineProvider injectFirst>
        <Container component="section" className="casePage">
          <Grid
            container
            className="casePage__aside"
            gap="40px"
            alignItems="flex-start"
          >
            <ProfileInfo data={caseData.author} />
            <CaseInfo data={caseData} />
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
                    srcSet={`${item.image}`}
                    src={`${item.image}`}
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
