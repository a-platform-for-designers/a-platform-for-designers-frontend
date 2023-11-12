import { Box, FormControl, FormLabel, Typography } from "@mui/material";
import classes from "./Profile.module.scss";
import { useState } from "react";
import MyDropDown from "@/components/UI/MyDropDown/MyDropDown";
import MyInput from "@/components/UI/MyInput/MyInput";
import MyButton from "@/components/UI/MyButton/MyButton";
import useInput from "@/hooks/useInput";
import AvatarUpload from "../avatarUpload/AvatarUpload";
import { LISTS } from "@/utils/constants";

const Profile: React.FC = () => {
  const [specialization, setSpecialization] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const education = useInput("", {});
  const hobby = useInput("", {});

  function handleSetSpecialization(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string | null
  ) {
    setSpecialization(newValue);
  }

  function handleSetCountry(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string | null
  ) {
    setCountry(newValue);
  }

  function handleSetLanguages(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    setLanguages(newValue);
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const values = {
      specialization,
      country,
      languages,
      selectedFile,
      education: education.value,
      hobby: hobby.value,
    };
    console.log(values);
  }

  return (
    <div className={classes.profile}>
      <div className={classes.profile__sections}>
        <AvatarUpload cbFileChange={setSelectedFile} />

        <Box className={classes.profile__section}>
          <Typography className={classes.profile__section_title}>
            Личные данные
          </Typography>

          <div className={classes.profile__section_wrapper}>
            <Box>
              <FormLabel className={classes.profile__section_subtitle}>
                Имя
              </FormLabel>
              <Typography className={classes.profile__name}>Ирина</Typography>
            </Box>

            <Box>
              <FormLabel className={classes.profile__section_subtitle}>
                Фамилия
              </FormLabel>
              <Typography className={classes.profile__name}>Петрова</Typography>
            </Box>

            <FormControl>
              <FormLabel className={classes.profile__section_subtitle}>
                Специализация
              </FormLabel>
              <MyDropDown
                className={classes.profile__myDrowDown}
                value={specialization}
                onChange={handleSetSpecialization}
                options={LISTS.LIST_SPECIALITY}
              />
            </FormControl>

            <FormControl>
              <FormLabel className={classes.profile__section_subtitle}>
                Страна
              </FormLabel>
              <MyDropDown
                className={classes.profile__myDrowDown}
                value={country}
                onChange={handleSetCountry}
                options={LISTS.LIST_COUNTRIES}
              />
            </FormControl>
          </div>
        </Box>

        <Box className={classes.profile__section}>
          <Typography className={classes.profile__section_title}>
            Образование
          </Typography>
          <div className={classes.profile__section_wrapper}>
            <MyInput data={education} variant="text-label-without" />
          </div>
        </Box>

        <Box className={classes.profile__section}>
          <Typography className={classes.profile__section_title}>
            Знание языков
          </Typography>
          <div className={classes.profile__section_wrapper}>
            <MyDropDown
              className={classes.profile__myDrowDown}
              variant="multiple"
              value={languages}
              options={LISTS.LIST_LANGUAGES}
              onChange={handleSetLanguages}
            />
          </div>
        </Box>

        <Box className={classes.profile__section}>
          <Typography className={classes.profile__section_title}>
            Хобби
          </Typography>
          <div className={classes.profile__section_wrapper}>
            <MyInput
              data={hobby}
              variant="textarea-label-without"
              maxLength={200}
            />
          </div>
        </Box>

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
