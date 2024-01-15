import { SyntheticEvent, useEffect, useState } from "react";
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
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalUsers: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DesignerFilters: React.FC<IProps> = ({
  setMentors,
  page,
  setPage,
  setTotalUsers,
  limit,
  setIsLoading,
}) => {
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const specialityIds = convertToIds(speciality, specializations);
      const skillsIds = convertToIds(skillsValue, skills);
      const instrumentsIds = convertToIds(tools, instruments);

      const filteredList = await filterService.getQueryMentors(
        skillsIds, // skills
        specialityIds, // specialization
        instrumentsIds, // tools
        limit,
        page
      );
      setMentors(filteredList.results);
      setTotalUsers(filteredList.count);
      setIsLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillsValue, speciality, tools, page]);

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
