import Box from "@mui/material/Box";
import classes from "./CaseCreation.module.scss";
import useInput from "@/hooks/useInput";
import { useState, SyntheticEvent, useEffect } from "react";
import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { IProfileDataItem } from "../../model/types";
import { ICasePreview, ICase } from "@/types";
import ProfileInput from "@/shared/UI/ProfileInput/ProfileInput";
import { MyButton } from "@/shared/UI";
import { useAppSelector } from "@/hooks/reduxHooks";
import CasePreview from "../casePreview/CasePreview";
import { casesService } from "@/api";
import getBase64 from "@/features/getBase64";
import { enqueueSnackbar } from "notistack";

interface IProps {
  caseInfo?: ICase;
}

const CaseCreation: React.FC<IProps> = ({ caseInfo }) => {
  const title = useInput(caseInfo?.title || "", { isEmpty: true });
  const time = useInput(caseInfo?.working_term || "", {});
  const description = useInput(caseInfo?.description || "", {});
  const [directions, setDirections] = useState<string | null>(
    caseInfo?.specialization?.name || null
  ); //??
  const [wrapper, setWrapper] = useState<File | null>(null); //??
  const [imageString, setImageString] = useState<string | undefined>();
  const [avatar, setAvatar] = useState<string | undefined>(""); //??
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); //??
  const [imagesString, setImagesString] = useState<string[] | undefined>();
  const [images, setImages] = useState<string[] | undefined>([]); //??
  const [sphereValue, setSphereValue] = useState<string | null>(
    caseInfo?.sphere?.name || null
  );
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const [onChangeInput, setOnChangeInput] = useState<boolean>(false);

  const [toolsValue, setToolsValue] = useState<string[]>(
    (caseInfo?.instruments || []).map((obj) =>
      typeof obj === "object" && "name" in obj ? obj["name"] : ""
    )
  );
  const [isCasePreview, setIsCasePreview] = useState<boolean>(false);
  const [caseDataValues, setCaseDataValues] = useState<ICasePreview>();

  const navigate = useNavigate();

  const { specializations, spheres, instruments } = useAppSelector(
    (state) => state.data
  );

  if (wrapper) {
    const aaa = URL.createObjectURL(wrapper);
    console.log(aaa);
  }

  useEffect(() => {
    if (!caseInfo) {
      setDisabledButton(
        !!(title.error || !wrapper || selectedFiles.length === 0)
      );
    } else {
      setDisabledButton(
        !!(title.error || !caseInfo.avatar || caseInfo.images.length === 0)
      );
    }
  }, [caseInfo, title.error, wrapper, selectedFiles]);

  useEffect(() => {
    if (caseInfo) {
      const pics = caseInfo.images;
      setImages(pics.map((pic) => pic.image));
      setAvatar(caseInfo.avatar);
    }
  }, [caseInfo]);

  const profileData: IProfileDataItem[] = [
    {
      heading: "Название",
      variant: "input",
      placeholder: "Название проекта",
      data: title,
      maxLength: 50,
      setDisableButton: setOnChangeInput,
    },
    {
      heading: "Направление",
      variant: "drop-down",
      placeholder: "Выберите направление из списка",
      options: [...Object.keys(specializations)],
      value: directions,
      onChange: handleSetDirections,
      notRequired: true,
    },
    {
      heading: "Обложка",
      variant: "wrapper-photo-upload",
      label: "Загрузить обложку",
      description: `Рекомендуемая ширина: 920 px\nДопустимые форматы: jpeg, jpg, tif, tiff, png\nМаксимальный размер файла: 5 Mb`,
      avatar: avatar,
      value: wrapper,
      onChange: handleSetWrapper,
      image: imageString,
    },
    {
      heading: "Изображения",
      variant: "case-photo-upload",
      label: "Загрузить изображения",
      description: `Рекомендуемая ширина: 920 px\nДопустимые форматы: jpeg, jpg, tif, tiff, png\nМаксимальный размер файла: 5 Mb`,
      images: images,
      value: selectedFiles,
      onChange: handleSetSelectedFiles,
      caseImages: imagesString,
    },
    {
      heading: "Сфера",
      variant: "drop-down",
      placeholder: "Добавьте из списка",
      options: [...Object.keys(spheres)],
      value: sphereValue,
      onChange: handleSetSphere,
      notRequired: true,
    },
    {
      heading: "Инструменты",
      variant: "tags",
      placeholder: "Какие программы использовали?",
      options: [...Object.keys(instruments)],
      value: toolsValue,
      onChange: handleSetTools,
    },
    {
      heading: "Срок реализации",
      variant: "input",
      placeholder: "Сколько времени делали проект",
      data: time,
      maxLength: 50,
      setDisableButton: setOnChangeInput,
    },
    {
      heading: "Описание проекта",
      variant: "input",
      placeholder: "Расскажите о задаче проекта и результатах работы",
      minRows: 5,
      data: description,
      maxLength: 500,
      setDisableButton: setOnChangeInput,
    },
  ];

  const convertStringToId = (
    str: string[] | string | null,
    state: { [key: string]: number }
  ) => {
    if (typeof str === "string") {
      return state[str];
    }

    if (!str) {
      return null;
    }

    const mappedInstruments = str.map((item: string) => {
      return state[item];
    });
    return mappedInstruments;
  };

  useEffect(() => {
    const fetchData = async () => {
      const item = await Promise.all(
        selectedFiles.map(async (file) => {
          const base64Image = await getBase64(file);
          return String(base64Image);
        })
      );
      setImagesString(item);
    };
    fetchData();
  }, [selectedFiles]);

  useEffect(() => {
    const fetchData = async () => {
      const item = String(await getBase64(wrapper!));
      setImageString(item);
    };
    fetchData();
  }, [wrapper]);

  function handleSetWrapper(
    _: React.ChangeEvent<HTMLInputElement>,
    newValue: File | null
  ) {
    setWrapper(newValue);
    setOnChangeInput(true);
  }

  function handleSetSelectedFiles(
    _: React.ChangeEvent<HTMLInputElement>,
    newValue: File
  ) {
    setSelectedFiles((prev) => [...prev, newValue]);
    setOnChangeInput(true);
  }

  function handleSetDirections(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string | null
  ) {
    setDirections(newValue);
    setOnChangeInput(true);
  }

  function handleSetTools(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5 || newValue.length === 0) return;
    setToolsValue(newValue);
    setOnChangeInput(true);
  }

  function handleSetSphere(
    _: SyntheticEvent<Element, Event>,
    newValue: string | null
  ) {
    setSphereValue(newValue);
    setOnChangeInput(true);
  }

  function handleDeleteCaseImage(index: number) {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const values = {
      title: title.value,
      workingTerm: time.value, // fix null
      description: description.value,
      specialization: convertStringToId(directions, specializations),
      avatar: String(await getBase64(wrapper!)),
      images: await Promise.all(
        selectedFiles.map(async (file) => {
          const base64Image = await getBase64(file);
          return {
            image: String(base64Image),
          };
        })
      ),
      sphere: convertStringToId(sphereValue, spheres),
      instruments: convertStringToId(toolsValue, instruments),
    };
    console.log(values);
    if (!caseInfo) {
      try {
        const createCase = await casesService.createCase(values);
        enqueueSnackbar("Кейс успешно создан", { variant: "success" });
        navigate("/dashboard/portfolio");
        return createCase;
      } catch {
        enqueueSnackbar("Произошла ошибка при создании кейса", {
          variant: "error",
        });
      }
    } else {
      try {
        const createCase = await casesService.editCase(caseInfo.id, values);
        enqueueSnackbar("Кейс успешно изменен", { variant: "success" });
        navigate("/dashboard/portfolio");
        return createCase;
      } catch {
        enqueueSnackbar("Произошла ошибка при редактировании кейса", {
          variant: "error",
        });
      }
    }
  }

  function handleCasePreview(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsCasePreview(true);
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

    if (!caseInfo) {
      navigate(`/dashboard/portfolio/create/preview`);
    } else {
      navigate(`/dashboard/portfolio/edit/${caseInfo?.id}/preview`);
    }
  }

  function handleEdit() {
    setIsCasePreview(false);
    if (!caseInfo) {
      navigate(`/dashboard/portfolio/create`);
    } else {
      navigate(`/dashboard/portfolio/edit/${caseInfo?.id}`);
    }
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
              disabled={disabledButton || !onChangeInput}
              variant="outlined"
            >
              Предпросмотр
            </MyButton>
            <MyButton
              className={classes.case__btn}
              onClick={handleSubmit}
              disabled={disabledButton || !onChangeInput}
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
