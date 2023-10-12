import {
  ButtonOneTapSkin,
  Config,
  Connect,
  ConnectEvents,
  VKAuthButtonCallbackResult,
} from "@vkontakte/superappkit";
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

const oneTapButton = Connect.buttonOneTapAuth({
  callback: (event: VKAuthButtonCallbackResult) => {
    const { type } = event;

    if (!type) {
      return;
    }

    switch (type) {
      case ConnectEvents.OneTapAuthEventsSDK.LOGIN_SUCCESS: // = 'VKSDKOneTapAuthLoginSuccess'
        console.log(event);
        return;
      // Для этих событий нужно открыть полноценный VK ID чтобы
      // пользователь дорегистрировался или подтвердил телефон
      case ConnectEvents.OneTapAuthEventsSDK.FULL_AUTH_NEEDED: //  = 'VKSDKOneTapAuthFullAuthNeeded'
      case ConnectEvents.OneTapAuthEventsSDK.PHONE_VALIDATION_NEEDED: // = 'VKSDKOneTapAuthPhoneValidationNeeded'
      case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN: // = 'VKSDKButtonOneTapAuthShowLogin'
        // url - строка с url, на который будет произведён редирект после авторизации.
        // state - состояние вашего приложение или любая произвольная строка, которая будет добавлена к url после авторизации.
        return Connect.redirectAuth({
          url: "https://...",
          state: "dj29fnsadjsd82...",
        });
      // Пользователь перешел по кнопке "Войти другим способом"
      case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN_OPTIONS: // = 'VKSDKButtonOneTapAuthShowLoginOptions'
        // Параметр screen: phone позволяет сразу открыть окно ввода телефона в VK ID
        // Параметр url: ссылка для перехода после авторизации. Должен иметь https схему. Обязательный параметр.
        return Connect.redirectAuth({ screen: "phone", url: "https://..." });
    }

    return;
  },
  // Не обязательный параметр с настройками отображения OneTap
  options: {
    showAlternativeLogin: true,
    showAgreements: true,
    displayMode: "default",
    langId: 0,
    buttonSkin: "flat" as ButtonOneTapSkin,
    buttonStyles: {
      borderRadius: 8,
      height: 50,
    },
  },
});

// Получить iframe можно с помощью метода getFrame()
if (oneTapButton) {
  document.body.appendChild(oneTapButton.getFrame()!);
}
