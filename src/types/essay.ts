export interface Essay {
  id: string;
  title: string;
  description: string;
  wordCount: number;
  lastModified: string;
  status: 'draft' | 'in-progress' | 'completed' | 'graded';
  subject: string;
}
