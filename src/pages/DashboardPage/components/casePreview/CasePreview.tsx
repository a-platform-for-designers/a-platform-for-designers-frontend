import {
  Box,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  StyledEngineProvider,
} from "@mui/material";
import "./CasePreview.scss";
// import { useState } from "react";
import { ICasePreview, ICaseInfo, IDataItem } from "@/types";
import { CaseInfo } from "../../../CasePage/components";
import { AboutItem } from "../../../ProfilePage/components";
import Preloader from "@/shared/Preloader/Preloader";
import { useAppSelector } from "@/hooks/reduxHooks";
import { MyButton } from "@/shared/UI";

interface IProps {
  caseData: ICasePreview | undefined;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CasePreview: React.FC<IProps> = ({
  caseData,
  handleSubmit,
  handleEdit,
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

  /* function setInstruments() {
    if (Array.isArray(caseData?.toolsValue)) {
      const name: string = "name";
      const result = caseData?.toolsValue.map((obj) =>
        String(obj[name as keyof typeof obj])
      );
      return result;
    }
  } */

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

  // if (!caseData) return <EmptyData title="Кейс не найден"></EmptyData>;

  return (
    <StyledEngineProvider injectFirst>
      <Container component="section" className="casePage">
        <Grid
          container
          className="casePage__aside"
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
        <Grid container className="casePage__content" gap="40px">
          <ImageList className="casePage__image-list" cols={2} gap={60}>
            <ImageListItem>
              {caseData?.wrapper ? (
                <img
                  className="casePage__image-item"
                  src={URL.createObjectURL(caseData.wrapper)}
                  alt={`Обложка кейса`}
                  loading="lazy"
                />
              ) : null}
            </ImageListItem>
            {caseData?.images.map((item) => (
              <ImageListItem key={item.name}>
                <img
                  className="casePage__image-item"
                  src={URL.createObjectURL(item)}
                  alt={`Изображение #${item.name}`}
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
            >
              Вернуться к редактированию
            </MyButton>
            <MyButton className="case-preview__btn" onClick={handleSubmit}>
              Опубликовать проект
            </MyButton>
          </Box>
        </Grid>
      </Container>
    </StyledEngineProvider>
  );
};

export default CasePreview;