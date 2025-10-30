import type { ClassOption } from 'types/class';
import type { ListingResponse } from 'types/response';
import type { UserOption } from 'types/user';

// TODO: status
// TODO: submissions
// TODO: grades
export interface Assignment {
  id: number;
  title: string;
  description?: string;
  due_date?: number;
  type?: string;
  instructions?: string;
  tips?: string[];
  requirements?: {
    min_word_count?: number;
    max_word_count?: number;
  };
  rubrics?: RubricItem[];
  status: 'upcoming' | 'in-progress' | 'submitted' | 'graded' | 'past-due';
}

export interface AssignmentListingResponse extends ListingResponse {
  value: (StudentAssignmentListingItem | TeacherAssignmentListingItem)[];
}

export interface StudentAssignmentListingItem extends Assignment {
  word_count: number;
  last_modified: string;
}

export interface AssignmentDetails extends Assignment {
  enrolled_classes: ClassOption[];
  enrolled_students: UserOption[];
}

// TODO: total students
// TODO: submissions
// TODO: graded
// TODO: avgScore
export interface TeacherAssignmentListingItem extends Assignment {
  total_students: number;
  submitted: number;
  graded: number;
  avgScore: number | null;
}

export interface RubricItem {
  criteria: string;
  description: string;
  points: number;
}

export interface AssignmentSubmission {
  id: number;
  word_count: number;
  last_modified: string;
  assignment_id: number;
}

export interface TeacherGrade {
  overallScore: number;
  totalPoints: number;
  criteriaScores: {
    criteria: string;
    score: number;
    maxPoints: number;
    feedback: string;
  }[];
  overallFeedback: string;
  gradedBy: string;
  gradedDate: string;
}
