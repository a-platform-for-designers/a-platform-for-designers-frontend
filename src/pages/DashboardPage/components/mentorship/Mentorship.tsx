import {
  Box,
  Radio,
  RadioGroup,
  Typography,
  FormControl,
  FormControlLabel,
  StyledEngineProvider,
} from "@mui/material";
import classes from "./Mentorship.module.scss";
import { MyButton, MyInput } from "@/shared/UI";
import { useState } from "react";
import useInput from "@/hooks/useInput";
import mentoringService from "@/api/services/mentoringService";
import { setMentorInfo } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

const Mentorship: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const price = useInput(
    user?.mentoring?.price?.toString() || "",
    {},
    { trim: true }
  );
  const dispatch = useAppDispatch();
  price.onChange = (event) => {
    setStatus(null);
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    const limitedValue = numericValue.slice(0, 9);
    price.onSetValue(limitedValue);
  };
  const experience = useInput(user?.mentoring?.experience || "", {
    isEmpty: true,
  });
  const expertise = useInput(user?.mentoring?.expertise || "", {
    isEmpty: true,
  });
  const [status, setStatus] = useState<boolean | null>(
    user?.mentoring?.agreement_free === false ||
      user?.mentoring?.agreement_free === true
      ? user?.mentoring?.agreement_free
      : null
  );

  function handleUnactive() {
    setStatus(false);
    price.onSetValue("");
  }

  function handleActive() {
    setStatus(true);
    price.onSetValue("");
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const values = {
      experience: experience.value,
      expertise: expertise.value,
      price: price.value ? parseInt(price.value, 10) : null,
      agreement_free: status,
    };

    const mentorInfo = await mentoringService.postMentoring({
      ...values,
    });
    dispatch(setMentorInfo(mentorInfo));
  }

  return (
    <StyledEngineProvider injectFirst>
      <div className={classes.mentorship}>
        <h2 className={classes.mentorship__header}>
          Заполните, если хотите стать ментором на платформе DesignCollab
        </h2>
        <div className={classes.mentorship__sections}>
          <Box className={classes.mentorship__section}>
            <Typography className={classes.mentorship__section_title}>
              Опыт работы
            </Typography>
            <div className={classes.mentorship__section_wrapper}>
              <MyInput
                data={experience}
                maxLength={200}
                label="Опыт работы"
                variant="textarea-label-without"
                placeholder="Расскажите где и кем работаете и работали"
                className={classes.mentorship__section_textarea}
              />
            </div>
          </Box>
          <Box className={classes.mentorship__section}>
            <Typography className={classes.mentorship__section_title}>
              С чем можете помочь?
            </Typography>
            <div className={classes.mentorship__section_wrapper}>
              <MyInput
                data={expertise}
                variant="textarea-label-without"
                placeholder="Опишите, чем можете помочь менти"
                minRows={10}
                maxLength={500}
                className={classes.mentorship__section_textarea}
              />
            </div>
          </Box>
          <Box className={classes.mentorship__section}>
            <Typography className={classes.mentorship__section_title}>
              Оплата
            </Typography>
            <div className={classes.mentorship__section_wrapper}>
              <MyInput
                data={price}
                variant="text-label-without"
                placeholder="Введите сумму за час работы"
                className={classes.mentorship__section_textarea_currency}
              />
              <Typography className={classes.mentorship__sectionText}>
                или
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={
                    status === null ? "" : status ? "by agreement" : "free"
                  }
                >
                  <FormControlLabel
                    className={classes.mentorship__radioItem}
                    value="by agreement"
                    control={<Radio onClick={handleActive} />}
                    label="Оплата по договоренности"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    className={classes.mentorship__radioItem}
                    value="free"
                    control={<Radio onClick={handleUnactive} />}
                    label="Бесплатно"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Box>
          <Box textAlign={"center"}>
            <MyButton
              className={classes.mentorship__btn}
              type="submit"
              onClick={handleSubmit}
            >
              Сохранить
            </MyButton>
          </Box>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default Mentorship;
