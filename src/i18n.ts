import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend'; // For loading translations

i18n
  // Load translation using http -> see /public/locales
  .use(HttpApi)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Init i18next
  .init({
    supportedLngs: ['en', 'es', 'fr', 'de', 'it', 'hu'], // Based on Project Guide
    fallbackLng: 'en',
    debug: true, // Enable debug logs to troubleshoot
    ns: 'translation',
    defaultNS: 'translation',
    detection: {
      order: ['localStorage', 'navigator'], // Detect language preference
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to translation files
    },
  });

export default i18n;
