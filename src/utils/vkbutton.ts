import { Config, Connect } from "@vkontakte/superappkit";

Config.init({
  appId: 51768929, // Тут нужно подставить ID своего приложения.

  appSettings: {
    agreements: "",
    promo: "",
    vkc_behavior: "",
    vkc_auth_action: "",
    vkc_brand: "",
    vkc_display_mode: "",
  },
});

export const redirectAuthHandler = () =>
  Connect.redirectAuth({
    url: "http://localhost:5173/ok",
    state: "",
    source: "",
    action: undefined,
    screen: undefined,
  });

//TODO при переходе на страницу /ok - будет парсится строка с пейлоадом и передаваться на бек
// ? http://localhost:5173/ok?payload=%7B%22type%22%3A%22silent_token%22%2C%22auth%22%3A1%2C%22user%22%3A%7B%22id%22%3A453651414%2C%22first_name%22%3A%22Антон

/* // парс
const encodedString = "ваша закодированная строка"; // вставьте вашу закодированную строку здесь
const decodedString = decodeURIComponent(encodedString);
const parsedObject = JSON.parse(decodedString);

// Теперь parsedObject содержит ваш распарсенный объект JSON
console.log(parsedObject);
*/
