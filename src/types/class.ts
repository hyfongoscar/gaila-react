import type { ListingResponse } from 'types/response';

export interface Class {
  id: number;
  name: string;
  description?: string;
  startAt?: number;
  endAt?: number;
}

export interface ClassListingResponse extends ListingResponse {
  value: Class[];
}

export interface ClassTeacher {
  id: number;
  classId: number;
  teacherId: number;
}

export interface ClassStudent {
  id: number;
  classId: number;
  studentId: number;
}
