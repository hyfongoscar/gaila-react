import { getLocalKey } from './localConfig';

export const localStorageSetItem = (key: string, value: string) =>
  window.localStorage.setItem(getLocalKey(key), value);

export const localStorageGetItem = (key: string) =>
  window.localStorage.getItem(getLocalKey(key));

export const localStorageRemoveItem = (key: string) =>
  window.localStorage.removeItem(getLocalKey(key));
