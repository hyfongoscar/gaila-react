import { callAPIHandler } from 'api/_base';
import type { Assignment, RubricItem } from 'types/assignment';
import { type Class, type ClassListingResponse } from 'types/class';

export const apiGetAssignments = async ({
  queryKey,
}: {
  queryKey: [string, { page: number; limit: number; filter: string }];
}) => {
  const [, { page, limit, filter }] = queryKey;
  const res = await callAPIHandler<ClassListingResponse>(
    'get',
    '/api/assignment/listing',
    { page, limit, filter },
    true,
  );
  return res;
};
apiGetAssignments.queryKey = '/api/assignment/listing';

export const apiGetClassValue = async ({
  queryKey,
}: {
  queryKey: [string, { id: string }];
}) => {
  const [, { id }] = queryKey;
  const res = await callAPIHandler<Class>(
    'get',
    '/api/assignment/view',
    { id },
    true,
  );
  return res;
};
apiGetClassValue.queryKey = '/api/assignment/view';

export interface AssignmentCreatePayload {
  title: string;
  description?: string;
  dueDate?: number;
  type?: string;
  instructions?: string;
  minWordCount?: number;
  maxWordCount?: number;
  rubrics?: RubricItem[];
  enrolledClassIds?: number[];
  enrolledStudentIds?: number[];
}

export const apiCreateAssignment = (
  assignment: AssignmentCreatePayload,
): Promise<Assignment> =>
  callAPIHandler('post', '/api/assignment/create', { assignment }, true);
