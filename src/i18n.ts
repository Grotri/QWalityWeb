import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationRU from "./locales/ru/translation.json";
import translationENG from "./locales/eng/translation.json";
import translationFR from "./locales/fr/translation.json";

i18n.use(initReactI18next).init({
  fallbackLng: "ru",
  lng: undefined,
  resources: {
    ru: { translation: translationRU },
    eng: { translation: translationENG },
    fr: { translation: translationFR },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
