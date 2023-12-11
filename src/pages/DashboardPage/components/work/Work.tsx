import {
  Box,
  Radio,
  RadioGroup,
  Typography,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import classes from "./Work.module.scss";
import { MyButton, MyInput, MyMultipleDropDown } from "@/shared/UI";
import { LISTS } from "@/constants/constants";
import { useState } from "react";
import useInput from "@/hooks/useInput";
import resumeService from "@/api/services/resumeService";

const Work: React.FC = () => {
  const [tools, setTools] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const about = useInput("", {});
  const [status, setStatus] = useState<boolean>(true);
  const [toolsIds, setToolsIds] = useState<number[]>([]);
  const [skillsIds, setSkillsIds] = useState<number[]>([]);

  function handleSetTools(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setTools(newValue);
    if (newValue[0] !== undefined) {
      const newValueId =
        LISTS.LIST_TOOLS.indexOf(newValue[newValue.length - 1]) + 1;
      console.log(newValue[newValue.length - 1]);
      setToolsIds([...toolsIds, newValueId]);
    }
  }

  function handleSetSkills(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setSkills(newValue);
    if (newValue[0] !== undefined) {
      const newValueId =
        LISTS.LIST_SKILLS.indexOf(newValue[newValue.length - 1]) + 1;
      console.log(newValue[newValue.length - 1]);
      setSkillsIds([...skillsIds, newValueId]);
    }
  }

  function handleUnactive() {
    setStatus(false);
  }

  function handleActive() {
    setStatus(true);
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const values = {
      skills: skillsIds,
      instruments: toolsIds,
      about: about.value,
      status,
    };
    resumeService.postResume(values);
  }

  return (
    <div className={classes.work}>
      <div className={classes.work__sections}>
        <Box className={classes.work__section}>
          <Typography className={classes.work__section_title}>
            Статус
          </Typography>
          <div className={classes.work__section_wrapper}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="searching"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="searching"
                  control={<Radio onClick={handleActive} />}
                  label="Ищу заказы"
                />
                <FormControlLabel
                  value="not-searching"
                  control={<Radio onClick={handleUnactive} />}
                  label="Не ищу заказы"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </Box>
        <Box className={classes.work__section}>
          <Typography className={classes.work__section_title}>
            Инструменты
          </Typography>
          <div className={classes.work__section_wrapper}>
            <MyMultipleDropDown
              className={classes.work__myDrowDown}
              value={tools}
              options={LISTS.LIST_TOOLS}
              onChange={handleSetTools}
              placeholder={tools.length ? "" : "Какие программы используете"}
            />
          </div>
        </Box>
        <Box className={classes.work__section}>
          <Typography className={classes.work__section_title}>
            Навыки
          </Typography>
          <div className={classes.work__section_wrapper}>
            <MyMultipleDropDown
              className={classes.work__myDrowDown}
              value={skills}
              options={LISTS.LIST_SKILLS}
              onChange={handleSetSkills}
              placeholder={skills.length ? "" : "Выберите навыки"}
            />
          </div>
        </Box>
        <Box className={classes.work__section}>
          <Typography className={classes.work__section_title}>
            О себе
          </Typography>
          <div className={classes.work__section_wrapper}>
            <MyInput
              data={about}
              variant="textarea-label-without"
              placeholder="Расскажите о себе, опыте и о том, что считаете важным..."
              minRows={10}
              maxLength={500}
              className={classes.work__section_textarea}
            />
          </div>
        </Box>
        <Box textAlign={"center"}>
          <MyButton
            className={classes.work__btn}
            type="submit"
            onClick={handleSubmit}
          >
            Сохранить
          </MyButton>
        </Box>
      </div>
    </div>
  );
};

export default Work;
