export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  lastAccess?: number;
  lastLogin?: number;
  timeCreated?: number;
  timeModified?: number;
  firstName?: string;
  lastName?: string;
  deleted?: boolean;
  lang?: string;
}

export interface UserOption {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  classId?: number;
  className?: string;
}

export type StudentOptionResponse = UserOption[];
