export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  last_access?: number;
  last_login?: number;
  time_created?: number;
  time_modified?: number;
  first_name?: string;
  last_name?: string;
  deleted?: boolean;
  lang?: string;
}

export interface UserOption {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  class_id?: number;
  class_name?: string;
}

export type StudentOptionResponse = UserOption[];
