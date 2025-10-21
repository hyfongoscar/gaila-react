export interface ListingResponse {
  count: number;
  page: number;
  limit: number;
  value: ViewResponse[];
}

export interface ViewResponse {
  id: number;
}
