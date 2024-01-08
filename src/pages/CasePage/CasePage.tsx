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
import { ICase, ICaseInfo } from "../../types";
import { ActionButton, CaseInfo, ProfileInfo } from "./components";
import { AboutItem, EmptyData } from "../ProfilePage/components";
import Preloader from "@/shared/Preloader/Preloader";
import MyOptimizedImage from "@/shared/UI/MyOptimizedImage/MyOptimizedImage";
import {
  OPTIMIZED_IMAGE_CASE_HEIGHT,
  OPTIMIZED_IMAGE_CASE_WIDTH,
} from "@/constants/constants";

const CasePage: React.FC = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState<ICase>();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const caseDataInfo: ICaseInfo = {
    title: caseData?.title,
    sphere: caseData?.sphere,
    working_term: caseData?.working_term,
    description: caseData?.description,
  };

  function setInstruments() {
    if (Array.isArray(caseData?.instruments)) {
      const name: string = "name";
      const result = caseData?.instruments.map((obj) =>
        String(obj[name as keyof typeof obj])
      );
      return result;
    }
  }

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

  if (!caseData) return <EmptyData title="Кейс не найден"></EmptyData>;

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
          <CaseInfo data={caseDataInfo} />
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
            <ImageListItem>
              <MyOptimizedImage
                className="casePage__image-item"
                imageUrl={caseData.avatar}
                width={OPTIMIZED_IMAGE_CASE_WIDTH}
                height={OPTIMIZED_IMAGE_CASE_HEIGHT}
                format="webp"
                maxAge="7d"
                alt="Обложка кейса"
              />
            </ImageListItem>
            {caseData.images.map((item) => (
              <ImageListItem key={item.id}>
                <MyOptimizedImage
                  className="casePage__image-item"
                  imageUrl={item.image}
                  width={OPTIMIZED_IMAGE_CASE_WIDTH}
                  height={OPTIMIZED_IMAGE_CASE_HEIGHT}
                  format="webp"
                  maxAge="7d"
                  alt={`Изображение #${item.id}`}
                />
              </ImageListItem>
            ))}
          </ImageList>
          <AboutItem title="Инструменты" data={setInstruments()} />
        </Grid>
      </Container>
    </StyledEngineProvider>
  );
};

export default CasePage;
