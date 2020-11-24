import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import * as Localization from 'expo-localization';
import en from "../assets/translations/en.json";
import am from "../assets/translations/am.json";

const resources = {
    en: {
        translation: en
    },
    am: {
        translation: am
    }
};

i18n.use(initReactI18next).init({
    lng: Localization.locale,
    fallbackLng: 'en',
    resources
});
export default i18n;
