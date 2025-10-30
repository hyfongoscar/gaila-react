import { isArray, isBoolean, isNumber, isObject } from 'lodash-es';

const isObjEmpty = (obj: any) => {
  if (isArray(obj)) {
    return obj.some(item => isObjEmpty(item));
  }
  if (isObject(obj)) {
    return Object.values(obj).some(item => isObjEmpty(item));
  }
  if (isBoolean(obj) || isNumber(obj)) {
    return obj === null || obj === undefined;
  }
  return !obj;
};

export default isObjEmpty;
