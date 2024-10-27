import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationTH from './locales/th/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      th: { translation: translationTH }
    },
    lng: 'th', 
    fallbackLng: 'th',
    interpolation: { escapeValue: false }
  });

export default i18n;
