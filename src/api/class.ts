import { callAPIHandler } from 'api/_base';
import { type Class, type ClassListingResponse } from 'types/class';

export const apiGetClasses = async ({
  queryKey,
}: {
  queryKey: [string, { page: number; limit: number; filter: string }];
}) => {
  const [, { page, limit, filter }] = queryKey;
  const res = await callAPIHandler<ClassListingResponse>(
    'get',
    '/api/class/listing',
    { page, limit, filter },
    true,
  );
  return res;
};
apiGetClasses.queryKey = '/api/class/listing';

export const apiGetClassValue = async ({
  queryKey,
}: {
  queryKey: [string, { id: string }];
}) => {
  const [, { id }] = queryKey;
  const res = await callAPIHandler<Class>(
    'get',
    '/api/class/view',
    { id },
    true,
  );
  return res;
};
apiGetClassValue.queryKey = '/api/class/view';
