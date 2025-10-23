import type { ClassOption } from 'types/class';
import type { UserOption } from 'types/user';

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  due_date?: number;
  type?: string;
  instructions?: string;
  min_word_count?: number;
  max_word_count?: number;
  rubrics?: RubricItem[];
  status: 'upcoming' | 'in-progress' | 'submitted' | 'graded' | 'past-due';
  enrolled_classes: ClassOption[];
  enrolled_students: UserOption[];
}

export interface RubricItem {
  criteria: string;
  description: string;
  points: number;
}

export interface StudentAssignment extends Assignment {
  word_count: number;
  last_modified: string;
}

export interface TeacherAssignment extends Assignment {
  total_students: number;
  submitted: number;
  graded: number;
  avgScore: number | null;
}
