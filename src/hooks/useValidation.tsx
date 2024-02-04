import { useEffect, useState } from "react";
import { IValidation } from "@/types";
import { useAppSelector } from "@/hooks/reduxHooks";

function useValidation(value: string, validations: IValidation) {
  const [emptyError, setEmptyError] = useState("");
  const [minLengthError, setMinLengthError] = useState("");
  const [maxLengthError, setMaxLengthError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dataError, setDataError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { errorMessages } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const emailPattern =
      /^[a-zA-Z0-9а-яА-Я._%+-]+@[a-zA-Z0-9а-яА-Я.-]+\.[a-zA-Zа-яА-Я]{2,}$/i;
    const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()_+]{8,}$/;
    const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    const phonePattern = /^\+\d{9,11}$/;

    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          value
            ? setEmptyError("")
            : setEmptyError("Поле обязательно для заполнения");
          break;

        case "isPassword":
          passwordPattern.test(String(value).toLowerCase())
            ? setPasswordError("")
            : setPasswordError(
                "Используйте латиницу, цифры или специальные символы"
              );
          break;

        case "badDataError":
          errorMessages.length >= 1
            ? setDataError("Неверный e-mail или пароль")
            : setDataError("");
          break;

        case "minLength":
          value.length < validations[validation]!
            ? setMinLengthError(
                `В поле должно быть минимум ${validations[validation]} символа`
              )
            : setMinLengthError("");
          break;

        case "maxLength":
          value.length > validations[validation]!
            ? setMaxLengthError(
                `В поле должно быть максимум ${validations[validation]} символа`
              )
            : setMaxLengthError("");
          break;

        case "isEmail":
          emailPattern.test(String(value).toLowerCase())
            ? setEmailError("")
            : setEmailError("Введите e-mail в формате abcde@bk.ru");
          break;

        case "isName":
          namePattern.test(String(value).toLowerCase())
            ? setNameError("")
            : setNameError("Используйте латиницу, кириллицу, пробел или дефис");
          break;

        case "isPhone":
          phonePattern.test(String(value).toLowerCase())
            ? setPhoneError("")
            : setPhoneError("Поле содержит недопустимые символы");
          break;

        default:
          break;
      }
    }
  }, [validations, value, errorMessages.length]);

  const error =
    emptyError ||
    minLengthError ||
    maxLengthError ||
    emailError ||
    nameError ||
    phoneError ||
    dataError ||
    passwordError;

  return error;
}

export default useValidation;
