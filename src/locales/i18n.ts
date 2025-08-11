import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { keys } from 'lodash-es';
import { initReactI18next } from 'react-i18next';

import Config from 'config';
import { getLocalKey } from 'utils/service/localConfig';

export const locales = {
  en: {
    label: 'EN',
    dayjs: 'en',
  },
  'zh-Hant': {
    label: '繁中',
    dayjs: 'zh-hk',
  },
  'zh-Hans': {
    label: '简中',
    dayjs: 'zh-cn',
  },
};

export const availableLocales = keys(locales);

export const i18n = i18next
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // detect language from localstorage or navigator
  .use(LanguageDetector)
  // Use dynamic load translation files
  .use(HttpApi)
  .init(
    {
      // resources: translationsJson,
      fallbackLng:
        availableLocales.indexOf(Config.fallbackLang || '') !== -1
          ? Config.fallbackLang
          : 'en',
      // @ts-expect-error languages not defined in object
      languages: availableLocales,
      debug:
        import.meta.env.NODE_ENV !== 'production' &&
        import.meta.env.NODE_ENV !== 'test' &&
        Config.i18nDebug,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      detection: {
        order: ['localstorage'],
        lookupLocalStorage: getLocalKey('locale'),
      },
      react: {
        useSuspense: false,
      },
    },
    e => {
      if (e) console.warn('i18n', e);
    },
  );
