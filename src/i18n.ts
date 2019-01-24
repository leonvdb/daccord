import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import XHR from 'i18next-xhr-backend';

i18n
    .use(reactI18nextModule)
    .use(XHR)
    .init({
        fallbackLng: 'en',
        lng: "en",
        returnEmptyString: false, // fallback to key
        keySeparator: false,

        interpolation: {
            escapeValue: false
        },

        react: {
            wait: true
        }
    });

export default i18n