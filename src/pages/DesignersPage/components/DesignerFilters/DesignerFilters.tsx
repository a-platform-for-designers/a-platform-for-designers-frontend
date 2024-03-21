import { SyntheticEvent, useEffect, useState } from "react";
import "./DesignerFilters.scss";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  DESIGNER_FILTERS_CLEAR_BTN_LABEL,
  READY_FOR_JOB_TITLE,
  SKILLS_TITLE,
  SPECIALIZATION_TITLE,
  TOOLS_TITLE,
  FILTER_OPTIONS,
} from "../../model/constants";
import { MyButton, MyCheckBox, MyMultipleDropDown } from "@/shared/UI";
import { useAppSelector } from "@/hooks/reduxHooks";
import { IUserWithLastCases } from "@/types";
import { filterService } from "@/api/services/filterService";

interface IProps {
  setDesigners: (IDesignersList: IUserWithLastCases[]) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalUsers: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DesignerFilters: React.FC<IProps> = ({
  setDesigners,
  page,
  setPage,
  setTotalUsers,
  limit,
  setIsLoading,
}) => {
  const [speciality, setSpeciality] = useState<string[]>([]);
  const [skillsValue, setSkillsValue] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [readyForJob, setReadyForJob] = useState<string[]>([
    FILTER_OPTIONS.readyForJobOptions[0],
  ]);
  const [resume, setResume] = useState<null | boolean>(null);

  const { skills } = useAppSelector((state) => state.data);
  const { specializations } = useAppSelector((state) => state.data);
  const { instruments } = useAppSelector((state) => state.data);

  function convertToIds(
    names: string[],
    specializations: Record<string, number>
  ): number[] {
    const idValues: number[] = [];
    names.forEach((name) => {
      const id = specializations[name];
      if (id) {
        idValues.push(id);
      }
    });
    return idValues;
  }

  function handleClearFilters() {
    setSpeciality([]);
    setSkillsValue([]);
    setTools([]);
    setReadyForJob([FILTER_OPTIONS.readyForJobOptions[0]]);
  }

  function handleSetSkills(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setPage(1);
    setSkillsValue(newValue);
  }

  function handleSetTools(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setPage(1);
    setTools(newValue);
  }

  function handleSpeciality(item: string) {
    const newValue = speciality.includes(item)
      ? speciality.filter((elem) => elem !== item)
      : [...speciality, item];
    setPage(1);
    setSpeciality(newValue);
  }

  function handleReadyForJob(item: string) {
    const newValue = speciality.includes(item)
      ? speciality.filter((elem) => elem !== item)
      : [...speciality, item];
    if (newValue.includes(FILTER_OPTIONS.readyForJobOptions[0])) {
      setResume(null);
    } else if (newValue.includes(FILTER_OPTIONS.readyForJobOptions[1])) {
      setResume(true);
    } else if (newValue.includes(FILTER_OPTIONS.readyForJobOptions[2])) {
      setResume(false);
    }
    setPage(1);
    setReadyForJob(newValue);
  }

  useEffect(() => {
    setIsLoading(true);
    const specialityIds = convertToIds(speciality, specializations);
    const skillsIds = convertToIds(skillsValue, skills);
    const instrumentsIds = convertToIds(tools, instruments);

    (async () => {
      const filteredList = await filterService.getQueryUsers(
        skillsIds, //skills
        specialityIds, //specialization
        instrumentsIds, //tools
        resume, //resume
        limit,
        page
      );
      setTotalUsers(filteredList.count);
      setDesigners(filteredList.results);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillsValue, speciality, tools, resume, page]);

  const specializationDesigners = Object.keys(specializations).filter(
    (item) => item !== "Менторство"
  );

  return (
    <div className="designerFilters">
      <div className="designerFilters__container">
        <MyButton
          onClick={handleClearFilters}
          className="designerFilters__button"
          type="button"
          variant="text"
          startIcon={<CloseIcon />}
          disabled={
            speciality.length === 0 &&
            skillsValue.length === 0 &&
            resume === null &&
            tools.length === 0
          }
        >
          {DESIGNER_FILTERS_CLEAR_BTN_LABEL}
        </MyButton>
      </div>
      <div className="designerFilters__container">
        <h2 className="designerFilters__title">{SPECIALIZATION_TITLE}</h2>
        {specializationDesigners.map((item, i) => {
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
        <h2 className="designerFilters__title">{READY_FOR_JOB_TITLE}</h2>
        <RadioGroup
          defaultValue="Все"
          name="ready-to-job"
          className="designerFilters__radio"
        >
          {FILTER_OPTIONS.readyForJobOptions.map((item, i) => {
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
        <h2 className="designerFilters__title">{SKILLS_TITLE}</h2>
        <MyMultipleDropDown
          options={Object.keys(skills)}
          value={skillsValue}
          onChange={handleSetSkills}
          className="designerFilters__dropdown"
          placeholder={skillsValue.length ? "" : "Выберите навыки"}
        />
      </div>

      <div className="designerFilters__container">
        <h2 className="designerFilters__title">{TOOLS_TITLE}</h2>
        <MyMultipleDropDown
          options={Object.keys(instruments)}
          value={tools}
          onChange={handleSetTools}
          className="designerFilters__dropdown"
          placeholder={tools.length ? "" : "Выберите инструменты"}
        />
      </div>
    </div>
  );
};

export default DesignerFilters;
