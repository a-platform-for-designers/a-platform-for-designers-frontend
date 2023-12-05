import {
  Container,
  Grid,
  ImageList,
  ImageListItem,
  StyledEngineProvider,
} from "@mui/material";
import "../../../CasePage/CasePage.scss";
import { ICasePreview, ICase } from "@/types";
import { useState } from "react";
import {
  ActionButton,
  CaseInfo,
  ProfileInfo,
} from "../../../CasePage/components";
import Preloader from "@/shared/Preloader/Preloader";
import { useAppSelector } from "@/hooks/reduxHooks";

interface ICasePreviewProps {
  values: ICasePreview | null;
}

const CasePreview: React.FC<ICasePreviewProps> = ({ values }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { user } = useAppSelector((state) => state.user);
  if (!user) return;

  const userMe = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    photo: user.photo,
    specialization: 8,
  };

  if (!values) return;

  const currentSphere = {
    id: 10001,
    name: values.sphereValue,
  };

  const previewData: ICase = {
    id: 0,
    author: userMe,
    title: values.title,
    sphere: currentSphere,
    instruments: values.toolsValue,
    working_term: values.time,
    description: values.description,
    is_favorited: false,
    is_liked: false,
    images: values.images,
    avatar: values.wrapper,
  };

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

  if (values)
    return (
      <StyledEngineProvider injectFirst>
        <Container component="section" className="casePage">
          <Grid
            container
            className="casePage__aside"
            gap="40px"
            alignItems="flex-start"
          >
            <ProfileInfo data={previewData.author} />
            <CaseInfo data={previewData} />
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
                <img
                  className="casePage__image-item"
                  src={`${values.wrapper}`}
                  alt={`Обложка кейса`}
                  loading="lazy"
                />
              </ImageListItem>
              {values.images.map((item) => (
                <ImageListItem key={item.name}>
                  <img
                    className="casePage__image-item"
                    src={`${item}`}
                    alt={`Изображение проекта в портфолио`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Container>
      </StyledEngineProvider>
    );
};

export default CasePreview;
