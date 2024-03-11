import {
  Box,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  StyledEngineProvider,
} from "@mui/material";
import "./CasePreview.scss";
import { ICasePreview, ICaseInfo, IDataItem, ICaseImage } from "@/types";
import { CaseInfo } from "../../../CasePage/components";
import { AboutItem } from "../../../ProfilePage/components";
import Preloader from "@/shared/Preloader/Preloader";
import { useAppSelector } from "@/hooks/reduxHooks";
import { MyButton } from "@/shared/UI";
import { EmptyData } from "../../../ProfilePage/components";

interface IProps {
  caseData: ICasePreview | undefined;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabledButton: boolean;
  imagesString?: ICaseImage[];
  imageString?: string;
}

const CasePreview: React.FC<IProps> = ({
  caseData,
  handleSubmit,
  handleEdit,
  disabledButton,
  imagesString,
  imageString,
}) => {
  const { spheres } = useAppSelector((state) => state.data);

  function createObject(
    name: string | null | undefined,
    idArray: { [key: string]: number }
  ): IDataItem | null {
    for (const key in idArray) {
      if (key === name) {
        return { name: name, id: idArray[key] };
      }
    }
    return null;
  }

  const result = createObject(caseData?.sphereValue, spheres);

  const caseInfoData: ICaseInfo = {
    title: caseData?.title,
    sphere: result || undefined,
    working_term: caseData?.time,
    description: caseData?.description,
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

  if (!caseData) return <EmptyData title="Кейс не найден"></EmptyData>;

  return (
    <StyledEngineProvider injectFirst>
      <Container component="section" className="case-preview">
        <Grid
          container
          className="case-preview__aside"
          gap="40px"
          alignItems="flex-start"
        >
          <CaseInfo data={caseInfoData} />
          <Grid
            container
            gap="28px"
            alignItems="center"
            justifyContent="flex-start"
            wrap="nowrap"
          ></Grid>
        </Grid>
        <Grid container className="case-preview__content" gap="40px">
          <ImageList className="case-preview__image-list" cols={2} gap={60}>
            <ImageListItem>
              {caseData?.wrapper ? (
                <img
                  className="case-preview__image-item"
                  src={URL.createObjectURL(caseData.wrapper)}
                  alt={`Обложка кейса`}
                  loading="lazy"
                />
              ) : null}
            </ImageListItem>
            <ImageListItem>
              {imageString ? (
                <img
                  className="case-preview__image-item"
                  src={imageString}
                  alt={`Обложка кейса`}
                  loading="lazy"
                />
              ) : null}
            </ImageListItem>
            {caseData?.images.map((item) => (
              <ImageListItem key={item.name}>
                <img
                  className="case-preview__image-item"
                  src={URL.createObjectURL(item)}
                  alt={`Изображение #${item.name}`}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
            {imagesString?.map((item) => (
              <ImageListItem key={item.id}>
                <img
                  className="case-preview__image-item"
                  src={item.image}
                  alt={`Изображение`}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <AboutItem
            title="Инструменты"
            data={caseData?.toolsValue}
            third={true}
          />
          <Box className="case-preview__submit">
            <MyButton
              className="case-preview__btn-back"
              onClick={handleEdit}
              variant="outlined"
              disabled={disabledButton}
            >
              Вернуться к редактированию
            </MyButton>
            <MyButton
              className="case-preview__btn"
              onClick={handleSubmit}
              disabled={disabledButton}
            >
              Опубликовать проект
            </MyButton>
          </Box>
        </Grid>
      </Container>
    </StyledEngineProvider>
  );
};

export default CasePreview;
