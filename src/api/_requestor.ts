import axios from 'axios';
import { buildStorage, setupCache } from 'axios-cache-interceptor';
import localforage from 'localforage';
import { isBoolean, isPlainObject, isString, mapValues } from 'lodash-es';
import qs from 'query-string';

import Config from 'config';

import type { Method } from './_base';

// Create `localforage` instance
const forageStore = localforage.createInstance({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  name: `${Config.apiDomain}|query|CBH-CORE`,
});

const storage = buildStorage({
  async find(key: string) {
    const value = await forageStore.getItem(key);
    if (!isString(value)) return;
    return JSON.parse(value);
  },
  async set(key: string, value: unknown) {
    await forageStore.setItem(key, JSON.stringify(value));
  },
  async remove(key: string) {
    await forageStore.removeItem(key);
  },
  async clear() {
    await forageStore.clear();
  },
});

const axiosInstance = axios.create({
  baseURL: Config.apiDomain,
});

// Non memory cache
// Memory cache is handled by react-query
const cachedAxiosInstance = setupCache(axiosInstance, {
  ttl: Config.maxAge,
  override: Config.disableCache,
  storage,
  interpretHeader: false,
});

// Trigger to clear cache
export const clearCache = async () => {
  console.debug('API Store Cleared');
  await forageStore.clear();
};

const requestor = cachedAxiosInstance;

export const getTypedRequestor = (
  type: Method,
): typeof cachedAxiosInstance.post => {
  if (type === 'get' || type === 'delete') {
    return async (url, data, options) => {
      try {
        // make sure data value is not object and correct format like boolean 1 0
        const cleanData = mapValues(data || {}, value => {
          if (isBoolean(value)) {
            return value ? '1' : '0';
          }
          return isPlainObject(value) ? JSON.stringify(value) : value;
        });
        return await requestor[type](
          qs.stringifyUrl({ url, query: cleanData }, { arrayFormat: 'index' }),
          options,
        );
      } catch (e: any) {
        return e.response;
      }
    };
  }
  return async (url, data, options) => {
    try {
      return await requestor[type](url, data, options);
    } catch (e: any) {
      return e.response;
    }
  };
};
