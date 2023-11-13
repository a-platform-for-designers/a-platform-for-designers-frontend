import { useEffect, useState } from "react";

export interface IValidation {
  isEmpty?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isName?: boolean;
  isPhone?: boolean;
  isPassword?: boolean;
}

function useValidation(value: string, validations: IValidation) {
  const [emptyError, setEmptyError] = useState("");
  const [minLengthError, setMinLengthError] = useState("");
  const [maxLengthError, setMaxLengthError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function determineFormSymbol(number: number): string {
    if (number % 10 === 1 && number % 100 !== 11) {
      return "символ";
    } else if (
      number % 10 >= 2 &&
      number % 10 <= 4 &&
      (number % 100 < 10 || number % 100 >= 20)
    ) {
      return "символа";
    } else {
      return "символов";
    }
  }

  useEffect(() => {
    const emailPattern =
      /^(([aA-zZ<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/;
    // Ниже для международных e-mail-ов
    // /^(([^аА-яЯ<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    const phonePattern = /^\+\d{9,11}$/;
    const passwordPatter = /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]+$/;

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
                `В поле должно быть минимум ${
                  validations[validation]
                } ${determineFormSymbol(validations[validation]!)}`
              )
            : setMinLengthError("");
          break;

        case "maxLength":
          value.length > validations[validation]!
            ? setMaxLengthError(
                `В поле должно быть максимум ${
                  validations[validation]
                } ${determineFormSymbol(validations[validation]!)}`
              )
            : setMaxLengthError("");
          break;

        case "isEmail":
          emailPattern.test(String(value).toLowerCase())
            ? setEmailError("")
            : setEmailError("Введите e-mail вида abcde@bk.ru");
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

        case "isPassword":
          passwordPatter.test(String(value).toLowerCase())
            ? setPasswordError("")
            : setPasswordError("Используйте латиницу, цифры или спецсимволы");
          break;
        default:
          break;
      }
    }
  }, [validations, value]);

  const error =
    emptyError ||
    minLengthError ||
    maxLengthError ||
    emailError ||
    nameError ||
    phoneError ||
    passwordError;

  return error;
}

export default useValidation;
