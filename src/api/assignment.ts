import { callAPIHandler } from 'api/_base';
import type { Assignment, RubricItem } from 'types/assignment';
import { type ClassListingResponse } from 'types/class';

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

export const apiViewAssignment = async ({
  queryKey,
}: {
  queryKey: [string, number];
}): Promise<Assignment> => {
  const [, assignmentId] = queryKey;
  const res = await callAPIHandler<Assignment>(
    'get',
    `/api/assignment/view/${assignmentId}`,
    {},
    true,
  );
  return res;
};
apiViewAssignment.queryKey = '/api/assignment/view/id';

export interface AssignmentCreatePayload {
  title: string;
  description?: string;
  due_date?: number;
  type?: string;
  instructions?: string;
  min_word_count?: number | null;
  max_word_count?: number | null;
  rubrics?: RubricItem[];
  enrolled_class_ids?: number[];
  enrolled_student_ids?: number[];
}

export const apiCreateAssignment = (
  assignment: AssignmentCreatePayload,
): Promise<Assignment> =>
  callAPIHandler('post', '/api/assignment/create', { assignment }, true);

export const apiUpdateAssignment = (
  assignment: { id: number } & Partial<AssignmentCreatePayload>,
): Promise<Assignment> =>
  callAPIHandler('post', '/api/assignment/update', { assignment }, true);
