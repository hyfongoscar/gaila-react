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

export const apiGetClassDetail = async ({
  queryKey,
}: {
  queryKey: [string, { id: number }];
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
apiGetClassDetail.queryKey = '/api/class/view';
