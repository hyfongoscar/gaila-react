export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'upcoming' | 'in-progress' | 'submitted' | 'graded' | 'past-due';
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
