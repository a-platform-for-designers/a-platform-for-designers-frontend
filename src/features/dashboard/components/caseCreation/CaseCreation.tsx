import Box from "@mui/material/Box";
import classes from "./CaseCreation.module.scss";
import ProfileInput from "@/components/UI/ProfileInput/ProfileInput";

const CaseCreation: React.FC = () => {
  function createDescription() {
    return (
      <p style={{ margin: 0 }}>
        Рекомендуемая ширина: 920 px
        <br />
        Допустимые форматы: jpeg, jpg, tif, tiff, png
        <br />
        Максимальный размер файла: 5 Mb
      </p>
    );
  }

  const directionsOptions = [
    "3D-дизайн",
    "Графический дизайн",
    "Иллюстрация",
    "Веб-дизайн",
  ];

  const spheres = [
    "3D-печать и производство",
    "Автомобильный дизайн",
    "Адаптивный и мобильный дизайн",
    "Анимация и визуализация эффектов",
    "Архитектурная визуализация",
    "Архитектурное проектирование",
    "Брендинг и идентичность (логотипы, фирменный стиль)",
    "Веб-дизайн для здравоохранения и медицины",
    "Визуализация для анимационных фильмов",
    "Визуализация для архитектурных проектов",
  ];

  const tools = [
    "3Ds Max",
    "Ландшафтный Дизайн 3D",
    "Adobe Experience Design",
    "Adobe Fresco",
    "Adobe Illustrator",
    "Adobe InDesign",
    "Adobe Photoshop",
    "Adobe Spark",
    "Adobe XD",
    "Affinity Designer",
  ];

  return (
    <Box className={classes.case}>
      <ProfileInput
        heading="Название"
        variant="input"
        placeholder="Название проекта"
      />
      <ProfileInput
        heading="Направление"
        variant="drop-down"
        placeholder="Выберите направление из списка"
        options={directionsOptions}
      />
      {/* Зарузить НОВУЮ обложку. Придумать как сделать. */}
      <ProfileInput
        heading="Обложка"
        variant="wrapper-photo-upload"
        label="Загрузить обложку"
        description={`Рекомендуемая ширина: 920 px\nДопустимые форматы: jpeg, jpg, tif, tiff, png
        Максимальный размер файла: 5 Mb`}
      />
      <ProfileInput
        heading="Изображения"
        variant="case-photo-upload"
        label="Загрузить изображения"
        description={createDescription()}
      />
      <ProfileInput
        heading="Сфера"
        variant="drop-down"
        placeholder="Добавьте из списка"
        options={spheres}
      />
      <ProfileInput
        heading="Инструменты"
        variant="tags"
        placeholder="Какие программы использовали?"
        options={tools}
      />
      <ProfileInput
        heading="Срок реализации"
        variant="input"
        placeholder="Сколько времени делали проект"
      />
      <ProfileInput
        heading="Описание проекта"
        variant="input"
        placeholder="Расскажите о задаче проекта и результатах работы"
      />
    </Box>
  );
};

export default CaseCreation;
