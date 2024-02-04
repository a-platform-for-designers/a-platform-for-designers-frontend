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

  const { errorMessages } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const emailPattern =
      /^(([^аА-яЯ<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    const phonePattern = /^\+\d{9,11}$/;

    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          value
            ? setEmptyError("")
            : setEmptyError("Поле обязательно для заполнения");
          break;

        case "badDataError":
          errorMessages.length >= 1
            ? setDataError("Неверный e-mail или пароль")
            : setDataError("");
          break;

        case "minLength":
          value.length < validations[validation]!
            ? setMinLengthError(
                `В поле должно быть минимум ${validations[validation]} ${
                  validations[validation]! === 2 ? "символа" : "символов"
                }`
              )
            : setMinLengthError("");
          break;

        case "maxLength":
          value.length > validations[validation]!
            ? setMaxLengthError(
                `В поле должно быть максимум ${validations[validation]} ${
                  validations[validation]! === 2 ? "символа" : "символов"
                }`
              )
            : setMaxLengthError("");
          break;

        case "isEmail":
          emailPattern.test(String(value).toLowerCase())
            ? setEmailError("")
            : setEmailError("Введите корректный e-mail вида abcde@bk.ru");
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
    dataError;

  return error;
}

export default useValidation;
