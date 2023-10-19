import { useEffect, useState } from "react";

export interface IValidation {
  isEmpty?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isName?: boolean;
}

function useValidation(value: string, validations: IValidation) {
  const [EmptyError, setEmptyError] = useState("");
  const [minLengthError, setMinLengthError] = useState("");
  const [maxLengthError, setMaxLengthError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [inputValid, setInputValid] = useState(false);

  //TODO Вынести стейт для смены фона инпута при отображении текста ошибки
  // const [isErrorMessageVisible, setErrorMessageVisible] = useState(false);

  useEffect(() => {
    const emailPattern =
      /^(([^аА-яЯ<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          value
            ? setEmptyError("")
            : setEmptyError("Поле обязательно для заполнения");
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
                `В поле должно быть минимум ${validations[validation]} ${
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

        default:
          break;
      }
    }
  }, [validations, value]);

  useEffect(() => {
    if (
      EmptyError ||
      minLengthError ||
      maxLengthError ||
      emailError ||
      nameError
    ) {
      setInputValid(false);
      // setErrorMessageVisible(true)
    } else {
      setInputValid(true);
    }
  }, [EmptyError, minLengthError, maxLengthError, emailError, nameError]);

  return {
    EmptyError,
    minLengthError,
    maxLengthError,
    emailError,
    nameError,
    inputValid,
    // isErrorMessageVisible
  };
}

export default useValidation;
