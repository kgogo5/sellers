import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import tranEn from "./translation/en.json";
import tranKo from "./translation/ko.json";

const resources = {
  en: { translation: tranEn },
  ko: { translation: tranKo },
};

i18n
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .on("languageChanged", (lng) => {
    document.documentElement.setAttribute("lang", lng);
  })
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  });

document.documentElement.lang = i18n.language;
export default i18n;
