import { SyntheticEvent, useState } from "react";
import MyCheckBox from "../../../../components/UI/MyCheckBox/MyCheckBox";
import "./DesignerFilters.scss";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import MyDropDown from "../../../../components/UI/MyDropDown/MyDropDown";
import CloseIcon from "@mui/icons-material/Close";

import {
  DESIGNER_FILTERS_CLEAR_BTN_LABEL,
  READY_FOR_JOB_TITLE,
  SKILLS_TITLE,
  SPECIALIZATION_TITLE,
  TOOLS_TITLE,
  FILTER_OPTIONS,
} from "../../model/constants";
import { LISTS } from "@/utils/constants";
import MyButton from "@/components/UI/MyButton/MyButton";

const DesignerFilters: React.FC = () => {
  const [speciality, setSpeciality] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [readyForJob, setReadyForJob] = useState<string[]>([
    FILTER_OPTIONS.readyForJobOptions[0],
  ]);

  function handleClearFilters() {
    setSpeciality([]);
    setSkills([]);
    setTools([]);
    setReadyForJob([FILTER_OPTIONS.readyForJobOptions[0]]);
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

  function handleReadyForJob(item: string) {
    const newValue = speciality.includes(item)
      ? speciality.filter((elem) => elem !== item)
      : [...speciality, item];
    setReadyForJob(newValue);
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
        <MyDropDown
          options={LISTS.LIST_SKILLS}
          value={skills}
          onChange={handleSetSkills}
          className="designerFilters__dropdown"
          variant="multiple"
        />
      </div>

      <div className="designerFilters__container">
        <h2 className="designerFilters__title">{TOOLS_TITLE}</h2>
        <MyDropDown
          options={LISTS.LIST_TOOLS}
          value={tools}
          onChange={handleSetTools}
          className="designerFilters__dropdown"
          variant="multiple"
        />
      </div>
    </div>
  );
};

export default DesignerFilters;
