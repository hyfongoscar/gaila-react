import { callAPIHandler } from 'api/_base';
import type {
  Assignment,
  AssignmentDetails,
  AssignmentListingResponse,
  AssignmentProgress,
  AssignmentStage,
  AssignmentSubmission,
  RubricItem,
} from 'types/assignment';

export const apiGetAssignments = async ({
  queryKey,
}: {
  queryKey: [string, { page: number; limit: number; filter: string }];
}) => {
  const [, { page, limit, filter }] = queryKey;
  const res = await callAPIHandler<AssignmentListingResponse>(
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
}): Promise<AssignmentDetails> => {
  const [, assignmentId] = queryKey;
  const res = await callAPIHandler<AssignmentDetails>(
    'get',
    `/api/assignment/view`,
    { id: assignmentId },
    true,
  );
  return res;
};
apiViewAssignment.queryKey = '/api/assignment/view/id';

export interface AssignmentCreatePayload {
  title: string;
  description?: string;
  due_date?: number | null;
  type?: string;
  instructions?: string;
  requirements?: {
    min_word_count?: number | null;
    max_word_count?: number | null;
  };
  rubrics?: RubricItem[];
  tips?: string[];
  enrolled_class_ids?: number[];
  enrolled_student_ids?: number[];
  stages: Omit<AssignmentStage, 'id'>[];
}

export const apiCreateAssignment = (
  assignment: AssignmentCreatePayload,
): Promise<Assignment> =>
  callAPIHandler('post', '/api/assignment/create', { assignment }, true);

export const apiUpdateAssignment = (
  assignment: { id: number } & Partial<AssignmentCreatePayload>,
): Promise<Assignment> =>
  callAPIHandler('post', '/api/assignment/update', { assignment }, true);

export const apiViewAssignmentProgress = async ({
  queryKey,
}: {
  queryKey: [string, number];
}): Promise<AssignmentProgress> => {
  const [, assignmentId] = queryKey;
  const res = await callAPIHandler<AssignmentProgress>(
    'get',
    `/api/assignment/view-progress`,
    { id: assignmentId },
    true,
  );
  return res;
};
apiViewAssignmentProgress.queryKey = '/api/assignment/view-progress/id';

type AssignmentSaveSubmissionPayload = {
  assignment_id: number;
  stage_id: number;
  content: string;
  is_final?: boolean;
};

export const apiSaveAssignmentSubmission = (
  submission: AssignmentSaveSubmissionPayload,
): Promise<AssignmentSubmission> =>
  callAPIHandler('post', '/api/assignment/submit', { submission }, true);
