import { SyntheticEvent, useState } from "react";
import MyCheckBox from "../UI/MyCheckBox/MyCheckBox";
import "./DesignerFilters.scss";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import MyDropDown from "../UI/MyDropDown/MyDropDown";
import Button from "@mui/material-next/Button";
import CloseIcon from "@mui/icons-material/Close";

const DesignerFilters: React.FC = () => {
  const [speciality, setSpeciality] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [readyForJob, setReadyForJob] = useState<string[]>([]);

  const toolsOptions = ["3D-анимация", "Афиши", "Брендбук", "Иконки"];
  const readyForJobOptions = ["Все", "Ищут заказы", "Не ищут заказы"];
  const skillsOptions = ["3D-анимация", "Афиши", "Брендбук", "Иконки"];
  const specialityOptipons = [
    "Графические дизайнеры",
    "Иллюстраторы",
    "3D визуализаторы",
    "Веб дизайнеры",
  ];

  function handleClearFilters() {
    setSpeciality([]);
    setSkills([]);
    setTools([]);
    setReadyForJob([readyForJobOptions[0]]);
  }

  function handleSetSkills(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    setSkills(newValue);
  }

  function handleSetTools(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    setTools(newValue);
  }

  function handleSpeciality(item: string) {
    const newValue = speciality.includes(item)
      ? speciality.filter((elem) => elem !== item)
      : [...speciality, item];
    setSpeciality(newValue);
  }

  function handleReadyForJob(item: string) {
    const newValue = speciality.includes(item)
      ? speciality.filter((elem) => elem !== item)
      : [...speciality, item];
    setReadyForJob(newValue);
  }

  return (
    <div className="designerFilters">
      <div className="designerFilters__container">
        <h2 className="designerFilters__title">Специализация</h2>
        {specialityOptipons.map((item, i) => {
          return (
            <MyCheckBox
              key={i}
              className="designerFilters__checkbox"
              labelPlacement="start"
              checked={speciality.includes(item)}
              label={item}
              onChange={() => {
                handleSpeciality(item);
              }}
            />
          );
        })}
      </div>

      <div className="designerFilters__container">
        <h2 className="designerFilters__title">Готовность к работе</h2>
        <RadioGroup
          defaultValue="Все"
          name="ready-to-job"
          className="designerFilters__radio"
        >
          {readyForJobOptions.map((item, i) => {
            return (
              <FormControlLabel
                key={i}
                className="designerFilters__radio-item"
                labelPlacement="start"
                value={item}
                control={
                  <Radio
                    onChange={() => handleReadyForJob(item)}
                    checked={readyForJob.includes(item)}
                  />
                }
                label={item}
              />
            );
          })}
        </RadioGroup>
      </div>

      <div className="designerFilters__container">
        <h2 className="designerFilters__title">Навыки</h2>
        <MyDropDown
          options={skillsOptions}
          value={skills}
          onChange={handleSetSkills}
          className="designerFilters__dropdown"
          variant="multiple"
        />
      </div>

      <div className="designerFilters__container">
        <h2 className="designerFilters__title">Инструменты</h2>
        <MyDropDown
          options={toolsOptions}
          value={tools}
          onChange={handleSetTools}
          className="designerFilters__dropdown"
          variant="multiple"
        />
      </div>

      <div className="designerFilters__container designerFilters__container_type_bottom">
        <Button
          onClick={handleClearFilters}
          disabled={false}
          className="designerFilters__button"
          type="button"
          startIcon={<CloseIcon />}
        >
          Сбросить фильтры
        </Button>
      </div>
    </div>
  );
};

export default DesignerFilters;
