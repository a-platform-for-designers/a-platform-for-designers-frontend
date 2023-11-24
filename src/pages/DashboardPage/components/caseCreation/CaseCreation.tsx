import Box from "@mui/material/Box";
import classes from "./CaseCreation.module.scss";
import useInput from "@/hooks/useInput";
import { useState, SyntheticEvent } from "react";
import { IProfileDataItem } from "../../model/types";
import { directionsOptions, tools, spheres } from "../../model/constants";
import ProfileInput from "@/shared/UI/ProfileInput/ProfileInput";
import { MyButton } from "@/shared/UI";
import getBase64 from "@/features/getBase64";

const CaseCreation: React.FC = () => {
  const title = useInput("", { isEmpty: true });
  const time = useInput("", {});
  const description = useInput("", {});
  const [directions, setDirections] = useState<string | null>(null);
  const [wrapper, setWrapper] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [sphereValue, setSphereValue] = useState<string | null>(null);
  const [toolsValue, setToolsValue] = useState<string[]>([]);

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
      options: [...directionsOptions],
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
      options: [...spheres],
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
      images: await Promise.all(
        selectedFiles.map(async (item) => await getBase64(item))
      ),
      sphereValue,
      toolsValue,
    };
    console.log(values);
  }

  return (
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
      <Box textAlign={"center"} marginLeft={15}>
        <MyButton
          className={classes.case__btn}
          onClick={handleSubmit}
          disabled={!!(title.error || !wrapper || selectedFiles.length === 0)}
        >
          Сохранить
        </MyButton>
      </Box>
    </>
  );
};

export default CaseCreation;
