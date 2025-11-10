export interface ListingResponse<T = ViewResponse> {
  count: number;
  page: number;
  limit: number;
  value: T[];
}

export interface ViewResponse {
  id: number;
}

export interface ResponseError {
  error: boolean;
  errorCode: string;
  errorMessage: string;
}
