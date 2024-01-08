import { SyntheticEvent, useEffect, useState } from "react";
import "./MentorsFilters.scss";
import CloseIcon from "@mui/icons-material/Close";
import {
  DESIGNER_FILTERS_CLEAR_BTN_LABEL,
  SKILLS_TITLE,
  SPECIALIZATION_TITLE,
  TOOLS_TITLE,
} from "../../model/constants";
import { MyButton, MyCheckBox, MyMultipleDropDown } from "@/shared/UI";
import { useAppSelector } from "@/hooks/reduxHooks";
import { IUserWithLastCases } from "@/types";
import { filterService } from "@/api/services/filterService";

interface IProps {
  setMentors: (IMentorsList: IUserWithLastCases[]) => void;
}

const DesignerFilters: React.FC<IProps> = ({ setMentors }) => {
  const [speciality, setSpeciality] = useState<string[]>([]);
  const [skillsValue, setSkillsValue] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);

  const { skills } = useAppSelector((state) => state.data);
  const { specializations } = useAppSelector((state) => state.data);
  const { instruments } = useAppSelector((state) => state.data);

  function handleClearFilters() {
    setSpeciality([]);
    setSkillsValue([]);
    setTools([]);
  }

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

  function handleSetSkills(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setSkillsValue(newValue);
  }

  function handleSetTools(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setTools(newValue);
  }

  function handleSpeciality(item: string) {
    const newValue = speciality.includes(item)
      ? speciality.filter((elem) => elem !== item)
      : [...speciality, item];
    setSpeciality(newValue);
  }

  useEffect(() => {
    const specialityIds = convertToIds(speciality, specializations);
    const skillsIds = convertToIds(skillsValue, skills);
    const instrumentsIds = convertToIds(tools, instruments);

    (async () => {
      const filteredList = await filterService.getQueryUsers(
        skillsIds, //skills
        specialityIds, //specialization
        instrumentsIds, //tools
        12,
        1
      );

      setMentors(filteredList.results);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillsValue, speciality, tools]);

  const specializationMentors = Object.keys(specializations).filter(
    (item) => item !== "Менторство"
  );

  return (
    <div className="designerFilters">
      <div className="designerFilters__container">
        <MyButton
          onClick={handleClearFilters}
          disabled={false}
          className="designerFilters__button"
          type="button"
          variant="text"
          startIcon={<CloseIcon />}
        >
          {DESIGNER_FILTERS_CLEAR_BTN_LABEL}
        </MyButton>
      </div>

      <div className="designerFilters__container">
        <h2 className="designerFilters__title">{SPECIALIZATION_TITLE}</h2>
        {specializationMentors.map((item, i) => {
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
