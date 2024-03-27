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
import { useAppSelector } from "@/hooks/reduxHooks";
import { casesService, userService } from "../../api";
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
  const { user } = useAppSelector((state) => state.user); // авторизованный пользователь
  const { id } = useParams();

  const [caseData, setCaseData] = useState<ICase>();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const caseDataInfo: ICaseInfo = {
    title: caseData?.title,
    sphere: caseData?.sphere,
    working_term: caseData?.working_term,
    description: caseData?.description,
  };

  // TODO нужно добавить отрисовку лайка при загрузке страницы

  function setInstruments() {
    if (Array.isArray(caseData?.instruments)) {
      const name: string = "name";
      const result = caseData?.instruments.map((obj) =>
        String(obj[name as keyof typeof obj])
      );
      return result;
    }
  }

  function handleLike() {
    setIsLiked(!isLiked);
    if (user) {
      const body = {
        first_name: user.first_name,
        last_name: user.last_name,
        photo: user?.photo,
        is_customer: user.is_customer,
        mentoring: user.mentoring,
      };
      if (caseData) {
        userService.setLike(caseData.author.id, body);
      }
    }
  }

  useEffect(() => {
    if (caseData?.is_favorited) {
      setIsFavorite(true);
    }
  }, [caseData]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const caseData = await casesService.getCaseById(Number(id));
          setCaseData(caseData);
        } catch (e) {
          console.log("Error fetching data:", e);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [id]);

  function handleFavourite() {
    setIsFavorite(!isFavorite);
    if (caseData) {
      casesService.setFavouriteCase(caseData.id);
    }
  }

  if (isLoading) {
    return (
      <StyledEngineProvider injectFirst>
        <Container component="section" className="casePage casePage_preloader">
          <Preloader />
        </Container>
      </StyledEngineProvider>
    );
  }

  if (!caseData && !isLoading)
    return <EmptyData title="Кейс не найден"></EmptyData>;

  if (caseData) {
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
                onClick={handleLike}
                disabled={caseData.author.id == user?.id}
              />
              <ActionButton
                active={isFavorite}
                onClick={handleFavourite}
                variant="favorite"
                disabled={caseData.author.id == user?.id}
              />
            </Grid>
          </Grid>
          <Grid container className="casePage__content" gap="40px">
            <ImageList className="casePage__image-list" cols={2} gap={60}>
              <ImageListItem>
                <MyOptimizedImage
                  className="casePage__image-item"
                  imageUrl={caseData?.avatar}
                  width={OPTIMIZED_IMAGE_CASE_WIDTH}
                  height={OPTIMIZED_IMAGE_CASE_HEIGHT}
                  format="webp"
                  maxAge="7d"
                  alt="Обложка кейса"
                />
              </ImageListItem>
              {caseData &&
                caseData.images.map((item) => (
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
  }
};

export default CasePage;
