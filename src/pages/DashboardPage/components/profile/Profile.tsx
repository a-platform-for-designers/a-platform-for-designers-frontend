import { Box, FormControl, FormLabel, Typography } from "@mui/material";
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
import { userService } from "@/api";
import { setUserInfo } from "@/redux/slices/userSlice";

const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [specialization, setSpecialization] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [language, setLanguage] = useState<string[]>([]);
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

  function handleSetLanguage(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    setLanguage(newValue);
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const values = {
      specialization,
      country,
      language,
      avatar: await getBase64(selectedFile!),
      education: education.value,
      hobby: hobby.value,
    };

    console.log(values);

    const user = await userService.updateInfoUserMe({
      // ...values,
      first_name: "aaa",
    });
    dispatch(setUserInfo(user));

    console.log(user);
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
              <Typography className={classes.profile__name}>
                {user?.first_name}
              </Typography>
            </Box>

            <Box>
              <FormLabel className={classes.profile__section_subtitle}>
                Фамилия
              </FormLabel>
              <Typography className={classes.profile__name}>
                {user?.last_name}
              </Typography>
            </Box>

            <FormControl>
              <FormLabel className={classes.profile__section_subtitle}>
                Специализация
              </FormLabel>
              <MySingleDropDown
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
              <MySingleDropDown
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
            <MyMultipleDropDown
              className={classes.profile__myDrowDown}
              value={language}
              options={LISTS.LIST_LANGUAGES}
              onChange={handleSetLanguage}
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
