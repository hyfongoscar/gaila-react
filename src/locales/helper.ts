import Config from 'config';
import { localStorageGetItem } from 'utils/service/localStorageSync';

export const getCurrentLang = () =>
  localStorageGetItem('locale') || Config.fallbackLang;
