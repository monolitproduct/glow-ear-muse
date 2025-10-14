import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require('../public/locales/en.json'),
      },
      de: {
        translation: require('../public/locales/de.json'),
      },
      es: {
        translation: require('../public/locales/es.json'),
      },
      fr: {
        translation: require('../public/locales/fr.json'),
      },
      hu: {
        translation: require('../public/locales/hu.json'),
      },
      it: {
        translation: require('../public/locales/it.json'),
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
