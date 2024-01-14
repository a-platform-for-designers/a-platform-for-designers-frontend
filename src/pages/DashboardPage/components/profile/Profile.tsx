import {
  Box,
  Radio,
  RadioGroup,
  Typography,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import classes from "./Profile.module.scss";
import { useState } from "react";
import useInput from "@/hooks/useInput";
import AvatarUpload from "../avatarUpload/AvatarUpload";
import { LISTS } from "@/constants/constants";
import getBase64 from "@/features/getBase64";
import {
  MyButton,
  MyInput,
  MyMultipleDropDown,
  MySingleDropDown,
} from "@/shared/UI";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import profileService from "@/api/services/profileService";
import { setUserInfo, setCustomerInfo } from "@/redux/slices/userSlice";

const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const isCustomer = user?.is_customer;

  const [specializationValue, setSpecializationValue] = useState<string[]>(
    (user?.profiledesigner?.specialization || []).map((obj) =>
      typeof obj === "object" && "name" in obj ? obj["name"] : ""
    )
  );
  const [specialization, setSpecialization] = useState<number[]>([]);
  const [country, setCountry] = useState<string | null>(
    user?.profiledesigner?.country || user?.profilecustomer?.country || null
  );
  const [languageValue, setLanguageValue] = useState<string[]>(
    (user?.profiledesigner?.language || []).map((obj) =>
      typeof obj === "object" && "name" in obj ? obj["name"] : ""
    )
  );
  const [language, setLanguage] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const education = useInput(user?.profiledesigner?.education || "", {});
  const post = useInput(user?.profilecustomer?.post || "", {});
  const aboutMe = useInput(user?.profilecustomer?.about || "", {});
  const [toolsValue, setToolsValue] = useState<string[]>(
    (user?.profiledesigner?.instruments || []).map((obj) =>
      typeof obj === "object" && "name" in obj ? obj["name"] : ""
    )
  );
  const [skillsValue, setSkillsValue] = useState<string[]>(
    (user?.profiledesigner?.skills || []).map((obj) =>
      typeof obj === "object" && "name" in obj ? obj["name"] : ""
    )
  );
  const about = useInput(user?.profiledesigner?.about || "", {});
  const [status, setStatus] = useState<boolean>(
    user?.profiledesigner?.work_status ?? false
  );
  const [toolsIds, setToolsIds] = useState<number[]>([]);
  const [skillsIds, setSkillsIds] = useState<number[]>([]);

  const { skills, instruments, specializations, languages } = useAppSelector(
    (state) => state.data
  );

  function handleSetCountry(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string | null
  ) {
    setCountry(newValue);
  }

  function handleSetTools(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setToolsValue(newValue);
    if (newValue[0] !== undefined) {
      const newValueId = newValue.map((key) => instruments[key]);
      setToolsIds([...newValueId]);
    }
  }

  function handleSetSkills(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setSkillsValue(newValue);
    if (newValue[0] !== undefined) {
      const newValueId = newValue.map((key) => skills[key]);
      setSkillsIds([...newValueId]);
    }
  }

  function handleSetSpecialization(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setSpecializationValue(newValue);
    if (newValue[0] !== undefined) {
      const newValueId = newValue.map((key) => specializations[key]);
      setSpecialization([...newValueId]);
    }
  }

  function handleSetLanguage(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setLanguageValue(newValue);
    if (newValue[0] !== undefined) {
      const newValueId = newValue.map((key) => languages[key]);
      setLanguage([...newValueId]);
    }
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!isCustomer) {
      const values = {
        specialization,
        country,
        language,
        photo: await getBase64(selectedFile!),
        education: education.value,
        skills: skillsIds,
        instruments: toolsIds,
        about: about.value,
        work_status: status,
      };

      const userInfo = await profileService.postProfileDesigner({
        ...values,
      });

      dispatch(setUserInfo(userInfo));
      return;
    }
    if (isCustomer) {
      const values = {
        country,
        photo: await getBase64(selectedFile!),
        post: post.value,
        about: aboutMe.value,
      };

      const userInfo = await profileService.postProfileCustomer({
        ...values,
      });

      dispatch(setCustomerInfo(userInfo));
      return;
    }
  }

  return (
    <div className={classes.profile}>
      <div className={classes.profile__sections}>
        <AvatarUpload cbFileChange={setSelectedFile} />

        <Box className={classes.profile__section}>
          <Typography className={classes.profile__section_title}>
            Имя
          </Typography>
          <div className={classes.profile__section_wrapper}>
            <Typography className={classes.profile__name}>
              {user?.first_name}
            </Typography>
          </div>
        </Box>

        <Box className={classes.profile__section}>
          <Typography className={classes.profile__section_title}>
            Фамилия
          </Typography>
          <div className={classes.profile__section_wrapper}>
            <Typography className={classes.profile__name}>
              {user?.last_name}
            </Typography>
          </div>
        </Box>

        {!isCustomer ? (
          <>
            <Box className={classes.profile__section}>
              <Typography className={classes.profile__section_title}>
                Статус
              </Typography>
              <div className={classes.profile__section_wrapper}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={status ? "searching" : "not-searching"}
                    name="radio-buttons-group"
                    onChange={(event) => {
                      const value = event.target.value;
                      setStatus(value === "searching");
                    }}
                  >
                    <FormControlLabel
                      value="searching"
                      control={<Radio />}
                      label="Ищу работу"
                    />
                    <FormControlLabel
                      value="not-searching"
                      control={<Radio />}
                      label="Не ищу работу"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </Box>
            <Box className={classes.profile__section}>
              <Typography className={classes.profile__section_title}>
                Специализация
              </Typography>
              <div className={classes.profile__section_wrapper}>
                <MyMultipleDropDown
                  className={classes.profile__myDrowDown}
                  value={specializationValue}
                  onChange={handleSetSpecialization}
                  options={Object.keys(specializations)}
                  placeholder={
                    specializationValue.length ? "" : "Добавьте из списка"
                  }
                />
              </div>
            </Box>
          </>
        ) : null}

        <Box className={classes.profile__section}>
          <Typography className={classes.profile__section_title}>
            Страна
          </Typography>
          <div className={classes.profile__section_wrapper}>
            <MySingleDropDown
              className={classes.profile__myDrowDown}
              value={country}
              onChange={handleSetCountry}
              options={LISTS.LIST_COUNTRIES}
              placeholder="Добавьте из списка"
            />
          </div>
        </Box>
        {!isCustomer ? (
          <>
            <Box className={classes.profile__section}>
              <Typography className={classes.profile__section_title}>
                Образование
              </Typography>
              <div className={classes.profile__section_wrapper}>
                <MyInput
                  data={education}
                  variant="text-label-without"
                  placeholder="Напишите, где учились"
                />
              </div>
            </Box>

            <Box className={classes.profile__section}>
              <Typography className={classes.profile__section_title}>
                Знание языков
              </Typography>
              <div className={classes.profile__section_wrapper}>
                <MyMultipleDropDown
                  className={classes.profile__myDrowDown}
                  value={languageValue}
                  options={Object.keys(languages)}
                  onChange={handleSetLanguage}
                  placeholder={languageValue.length ? "" : "Добавьте из списка"}
                />
              </div>
            </Box>

            <Box className={classes.profile__section}>
              <Typography className={classes.profile__section_title}>
                Инструменты
              </Typography>
              <div className={classes.profile__section_wrapper}>
                <MyMultipleDropDown
                  className={classes.profile__myDrowDown}
                  value={toolsValue}
                  options={Object.keys(instruments)}
                  onChange={handleSetTools}
                  placeholder={
                    toolsValue.length ? "" : "Какие программы используете"
                  }
                />
              </div>
            </Box>
            <Box className={classes.profile__section}>
              <Typography className={classes.profile__section_title}>
                Навыки
              </Typography>
              <div className={classes.profile__section_wrapper}>
                <MyMultipleDropDown
                  className={classes.profile__myDrowDown}
                  value={skillsValue}
                  options={Object.keys(skills)}
                  onChange={handleSetSkills}
                  placeholder={skillsValue.length ? "" : "Выберите навыки"}
                />
              </div>
            </Box>
            <Box className={classes.profile__section}>
              <Typography className={classes.profile__section_title}>
                О себе
              </Typography>
              <div className={classes.profile__section_wrapper}>
                <MyInput
                  data={about}
                  variant="textarea-label-without"
                  placeholder="Расскажите о себе, опыте и о том, что считаете важным..."
                  minRows={10}
                  maxLength={500}
                  className={classes.profile__section_textarea}
                />
              </div>
            </Box>
          </>
        ) : (
          <>
            <Box className={classes.profile__section}>
              <Typography className={classes.profile__section_title}>
                Место работы
              </Typography>
              <div className={classes.profile__section_wrapper}>
                <MyInput
                  data={post}
                  variant="textarea-label-without"
                  maxLength={50}
                  placeholder="Компания и должность"
                />
              </div>
            </Box>

            <Box className={classes.profile__section}>
              <Typography className={classes.profile__section_title}>
                О себе
              </Typography>
              <div className={classes.profile__section_wrapper}>
                <MyInput
                  data={aboutMe}
                  variant="textarea-label-without"
                  maxLength={200}
                  minRows={6.5}
                  placeholder="Расскажите о себе..."
                  className={classes.profile__aboutMe}
                />
              </div>
            </Box>
          </>
        )}

        <Box textAlign={"center"}>
          <MyButton
            className={classes.profile__btn}
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

export default Profile;
