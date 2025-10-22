export interface Assignment {
  id: string;
  title: string;
  description?: string;
  dueDate?: number;
  type?: string;
  instructions?: string;
  minWordCount?: number;
  maxWordCount?: number;
  rubrics?: RubricItem[];
  status: 'upcoming' | 'in-progress' | 'submitted' | 'graded' | 'past-due';
}

export interface RubricItem {
  criteria: string;
  description: string;
  points: number;
}

export interface StudentAssignment extends Assignment {
  wordCount: number;
  lastModified: string;
}

export interface TeacherAssignment extends Assignment {
  totalStudents: number;
  submitted: number;
  graded: number;
  avgScore: number | null;
}
