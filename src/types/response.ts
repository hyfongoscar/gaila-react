export interface ListingResponse {
  count: number;
  page: number;
  limit: number;
  value: ViewResponse[];
}

export interface ViewResponse {
  id: number;
}

export interface ResponseError {
  error: boolean;
  errorCode: string;
  errorMessage: string;
}
