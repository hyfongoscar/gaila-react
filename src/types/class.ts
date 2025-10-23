import type { ListingResponse } from 'types/response';

export interface Class {
  id: number;
  name: string;
  num_students: number;
  description?: string;
  start_at?: number;
  end_at?: number;
}

export interface ClassListingResponse extends ListingResponse {
  value: Class[];
}

export interface ClassTeacher {
  id: number;
  class_id: number;
  teacher_id: number;
}

export interface ClassStudent {
  id: number;
  class_id: number;
  student_id: number;
}

export interface ClassOption {
  id: number;
  name: string;
  num_students: number;
}

export type ClassOptionResponse = ClassOption[];
