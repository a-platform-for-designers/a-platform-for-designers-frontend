import Box from "@mui/material/Box";
import classes from "./CaseCreation.module.scss";
import useInput from "@/hooks/useInput";
import { useState, SyntheticEvent } from "react";
import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { IProfileDataItem } from "../../model/types";
import { ICasePreview } from "@/types";
import { tools } from "../../model/constants";
import ProfileInput from "@/shared/UI/ProfileInput/ProfileInput";
import { MyButton } from "@/shared/UI";
import { useAppSelector } from "@/hooks/reduxHooks";
import CasePreview from "../casePreview/CasePreview";

const CaseCreation: React.FC = () => {
  const title = useInput("", { isEmpty: true });
  const time = useInput("", {});
  const description = useInput("", {});
  const [directions, setDirections] = useState<string | null>(null);
  const [wrapper, setWrapper] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [sphereValue, setSphereValue] = useState<string | null>(null);
  const [toolsValue, setToolsValue] = useState<string[]>([]);
  const [isCasePreview, setIsCasePreview] = useState<boolean>(false);
  const [caseDataValues, setCaseDataValues] = useState<ICasePreview>();

  const { specializations, spheres } = useAppSelector((state) => state.data);
  const navigate = useNavigate();

  const profileData: IProfileDataItem[] = [
    {
      heading: "Название",
      variant: "input",
      placeholder: "Название проекта",
      data: title,
      maxLength: 50,
    },
    {
      heading: "Направление",
      variant: "drop-down",
      placeholder: "Выберите направление из списка",
      options: [...Object.keys(specializations)],
      value: directions,
      onChange: handleSetDirections,
    },
    {
      heading: "Обложка",
      variant: "wrapper-photo-upload",
      label: "Загрузить обложку",
      description: `Рекомендуемая ширина: 920 px\nДопустимые форматы: jpeg, jpg, tif, tiff, png\nМаксимальный размер файла: 5 Mb`,
      value: wrapper,
      onChange: handleSetWrapper,
    },
    {
      heading: "Изображения",
      variant: "case-photo-upload",
      label: "Загрузить изображения",
      description: `Рекомендуемая ширина: 920 px\nДопустимые форматы: jpeg, jpg, tif, tiff, png\nМаксимальный размер файла: 5 Mb`,
      value: selectedFiles,
      onChange: handleSetSelectedFiles,
      disabled: selectedFiles.length === 4,
    },
    {
      heading: "Сфера",
      variant: "drop-down",
      placeholder: "Добавьте из списка",
      options: [...Object.keys(spheres)],
      value: sphereValue,
      onChange: handleSetSphere,
    },
    {
      heading: "Инструменты",
      variant: "tags",
      placeholder: "Какие программы использовали?",
      options: [...tools],
      value: toolsValue,
      onChange: handleSetTools,
    },
    {
      heading: "Срок реализации",
      variant: "input",
      placeholder: "Сколько времени делали проект",
      data: time,
      maxLength: 50,
    },
    {
      heading: "Описание проекта",
      variant: "input",
      placeholder: "Расскажите о задаче проекта и результатах работы",
      minRows: 5,
      data: description,
      maxLength: 500,
    },
  ];

  function handleSetWrapper(
    _: React.ChangeEvent<HTMLInputElement>,
    newValue: File | null
  ) {
    setWrapper(newValue);
  }

  function handleSetSelectedFiles(
    _: React.ChangeEvent<HTMLInputElement>,
    newValue: File
  ) {
    setSelectedFiles((prev) => [...prev, newValue]);
  }

  function handleSetDirections(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string | null
  ) {
    setDirections(newValue);
  }

  function handleSetTools(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    setToolsValue(newValue);
  }

  function handleSetSphere(
    _: SyntheticEvent<Element, Event>,
    newValue: string | null
  ) {
    setSphereValue(newValue);
  }

  function handleDeleteCaseImage(index: number) {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const values = {
      title: title.value,
      time: time.value,
      description: description.value,
      directions,
      wrapper,
      images: selectedFiles,
      /* images: await Promise.all(
        selectedFiles.map(async (item) => await getBase64(item))
      ), */
      sphereValue,
      toolsValue,
    };
    console.log(values);
  }

  function handleCasePreview(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const values = {
      title: title.value,
      time: time.value,
      description: description.value,
      directions,
      wrapper,
      images: selectedFiles,
      sphereValue,
      toolsValue,
    };
    setCaseDataValues(values);
    setIsCasePreview(true);
  }

  function handleEdit() {
    setIsCasePreview(false);
    navigate("/dashboard/portfolio/create/preview");
  }

  return (
    <>
      {!isCasePreview ? (
        <>
          <Box className={classes.case}>
            {profileData.map((item) => {
              return (
                <ProfileInput
                  key={item.heading}
                  handleDeleteCaseImage={handleDeleteCaseImage}
                  {...item}
                />
              );
            })}
          </Box>
          <Box className={classes.case__submit}>
            <MyButton
              className={classes.case__btn}
              onClick={handleCasePreview}
              disabled={
                !!(title.error || !wrapper || selectedFiles.length === 0)
              }
              variant="outlined"
            >
              Предпросмотр
            </MyButton>
            <MyButton
              className={classes.case__btn}
              onClick={handleSubmit}
              disabled={
                !!(title.error || !wrapper || selectedFiles.length === 0)
              }
            >
              Опубликовать проект
            </MyButton>
          </Box>
        </>
      ) : (
        <Routes>
          <Route path="/">
            <Route index element={<Navigate replace to={"preview"} />} />
            <Route
              path="/preview"
              element={
                <CasePreview
                  handleSubmit={handleSubmit}
                  caseData={caseDataValues}
                  handleEdit={handleEdit}
                />
              }
            />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default CaseCreation;
