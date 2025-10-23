import type { ResponseError } from 'types/response';

const isResponseError = (error: unknown): error is ResponseError => {
  return (
    !!error &&
    typeof error === 'object' &&
    'error' in error &&
    'errorMessage' in error &&
    'errorCode' in error
  );
};

const getErrorMessage = (error: unknown) => {
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (isResponseError(error)) {
    return error.errorMessage;
  }
  return JSON.stringify(error);
};

export default getErrorMessage;
