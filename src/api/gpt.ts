import { callAPIHandler } from 'api/_base';
import type { GptLog } from 'types/gpt';
import type { ListingResponse } from 'types/response';

export const apiAskGpt = (payload: {
  assignment_tool_id: number;
  question: string;
}): Promise<GptLog> => callAPIHandler('post', '/api/gpt/ask', payload, true);

interface GetGptLogQueryParam {
  assignment_tool_id: number;
  page: number;
  limit: number;
}

export const apiGetGptLogs = async ({
  queryKey,
}: {
  queryKey: [string, GetGptLogQueryParam];
}) => {
  const [, queryParam] = queryKey;
  const res = await callAPIHandler<ListingResponse<GptLog>>(
    'get',
    '/api/gpt/listing',
    queryParam,
    true,
  );
  return res;
};
apiGetGptLogs.queryKey = '/api/gpt/listing';

export const apiGetGptLogsMutate = async (queryParam: GetGptLogQueryParam) => {
  return apiGetGptLogs({ queryKey: [apiGetGptLogs.queryKey, queryParam] });
};
