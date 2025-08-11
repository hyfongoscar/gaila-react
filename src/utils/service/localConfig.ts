import Config from 'config';

// TODO: change storage key
export const storeConfig = {
  key: `${Config.apiDomain}|store|CBH-CORE`,
  version: parseInt(Config.cacheNumber || '0', 10) + 2,
};

export const getLocalKey = (key: string) => {
  return `${storeConfig.key}_${storeConfig.version}_${key}`;
};
