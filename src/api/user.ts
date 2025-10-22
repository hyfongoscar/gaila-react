import { callAPIHandler } from 'api/_base';
import { type ClassOptionResponse } from 'types/class';
import type { StudentOptionResponse } from 'types/user';

export const apiGetClassOptions = async ({
  queryKey: _,
}: {
  queryKey: [string];
}) => {
  const res = await callAPIHandler<ClassOptionResponse>(
    'get',
    '/api/user/class-options',
    {},
    true,
  );
  return res;
};
apiGetClassOptions.queryKey = '/api/user/class-options';

export const apiGetStudentOptions = async ({
  queryKey,
}: {
  queryKey: [string, { classId: number }];
}) => {
  const [, { classId }] = queryKey;
  const res = await callAPIHandler<StudentOptionResponse>(
    'get',
    '/api/user/student-options',
    { classId },
    true,
  );
  return res;
};
apiGetStudentOptions.queryKey = '/api/user/student-options';
