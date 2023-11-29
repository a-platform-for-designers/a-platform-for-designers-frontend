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

const Work: React.FC = () => {
  const [tools, setTools] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const about = useInput("", {});

  function handleSetTools(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    setTools(newValue);
  }

  function handleSetSkills(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    setSkills(newValue);
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const values = {
      //radio to do
      skills,
      tools,
      about: about.value,
    };
    console.log(values);
  }

  return (
    <div className={classes.work__sections}>
      <Box className={classes.work__section}>
        <Typography className={classes.work__section_title}>Статус</Typography>
        <div className={classes.work__section_wrapper}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="searching"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="searching"
                control={<Radio />}
                label="Ищу заказы"
              />
              <FormControlLabel
                value="not-searching"
                control={<Radio />}
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
            placeholder="Какие программы используете"
          />
        </div>
      </Box>
      <Box className={classes.work__section}>
        <Typography className={classes.work__section_title}>Навыки</Typography>
        <div className={classes.work__section_wrapper}>
          <MyMultipleDropDown
            className={classes.work__myDrowDown}
            value={skills}
            options={LISTS.LIST_SKILLS}
            onChange={handleSetSkills}
            placeholder="Выберите навыки"
          />
        </div>
      </Box>
      <Box className={classes.work__section}>
        <Typography className={classes.work__section_title}>О себе</Typography>
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
  );
};

export default Work;
