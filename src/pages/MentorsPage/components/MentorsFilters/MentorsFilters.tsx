import { SyntheticEvent, useState } from "react";
import "./MentorsFilters.scss";
import CloseIcon from "@mui/icons-material/Close";
import {
  DESIGNER_FILTERS_CLEAR_BTN_LABEL,
  SKILLS_TITLE,
  SPECIALIZATION_TITLE,
  TOOLS_TITLE,
  FILTER_OPTIONS,
} from "../../model/constants";
import { LISTS } from "@/constants/constants";
import { MyButton, MyCheckBox, MyMultipleDropDown } from "@/shared/UI";

const DesignerFilters: React.FC = () => {
  const [speciality, setSpeciality] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);

  function handleClearFilters() {
    setSpeciality([]);
    setSkills([]);
    setTools([]);
  }

  function handleSetSkills(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setSkills(newValue);
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
        {FILTER_OPTIONS.specialityOptions.map((item, i) => {
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
          options={LISTS.LIST_SKILLS}
          value={skills}
          onChange={handleSetSkills}
          className="designerFilters__dropdown"
        />
      </div>

      <div className="designerFilters__container">
        <h2 className="designerFilters__title">{TOOLS_TITLE}</h2>
        <MyMultipleDropDown
          options={LISTS.LIST_TOOLS}
          value={tools}
          onChange={handleSetTools}
          className="designerFilters__dropdown"
        />
      </div>
    </div>
  );
};

export default DesignerFilters;
