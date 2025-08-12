import localforage from 'localforage';

import Config from 'config';

const storeConfig = {
  key: `${Config.apiDomain}|store|CBH-CORE`,
  version: parseInt(import.meta.env.VITE_CACHE_NUMBER || '0', 10) + 2,
};

localforage.config(storeConfig);

export const getLocalKey = (key: string) => {
  return `${storeConfig.key}_${storeConfig.version}_${key}`;
};

const store = {
  async getItem(key: string) {
    try {
      const value = await localforage.getItem(getLocalKey(key));
      if (value) return value;
      return undefined;
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  },
  async setItem(key: string, value: unknown) {
    try {
      await localforage.setItem(getLocalKey(key), value);
      return true;
    } catch (e) {
      console.warn(e);
      return false;
    }
  },
  async deleteItem(key: string) {
    try {
      await localforage.removeItem(getLocalKey(key));
      return true;
    } catch (e) {
      console.warn(e);
      return false;
    }
  },
  async getKeys(prefixKey: string) {
    try {
      const keys = await localforage.keys();
      const prefix = getLocalKey(prefixKey);
      return keys
        .filter(s => s.indexOf(prefix) === 0)
        .map(s => s.replace(prefix, ''));
    } catch (e) {
      console.warn(e);
      return [];
    }
  },
};

export const getLocalItem = (key: string) => store.getItem(key);

export const setLocalItem = (key: string, value: unknown) =>
  store.setItem(key, value);

export const deleteLocalItem = (key: string) => store.deleteItem(key);

export const getLocalItemKeys = (prefix: string) => store.getKeys(prefix);

export default function persist(key: string) {
  return {
    setValue: (value: unknown) => setLocalItem(key, value),
    getValue: () => getLocalItem(key),
  };
}
