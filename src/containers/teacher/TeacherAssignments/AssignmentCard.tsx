import React, { useCallback } from 'react';

import { isNumber } from 'lodash-es';
import { Calendar, Edit, FileText } from 'lucide-react';

import Badge from 'components/Badge';
import Button from 'components/Button';
import Card from 'components/Card';

import type { TeacherAssignment } from 'types/assignment';

type Props = {
  assignment: TeacherAssignment;
};

const AssignmentCard = ({ assignment }: Props) => {
  const getStatusBadge = (status: TeacherAssignment['status']) => {
    if (status === 'in-progress')
      return <Badge variant="primary">In Progress</Badge>;
    if (status === 'upcoming')
      return <Badge variant="secondary">Upcoming</Badge>;
    return <Badge variant="outline">Past Due</Badge>;
  };

  const getProgressPercentage = (submitted: number, total: number) => {
    return Math.round((submitted / total) * 100);
  };

  const onViewAssignment = useCallback((id: string) => {}, []);
  const onEditAssignment = useCallback((id: string) => {}, []);

  return (
    <Card
      childrenClass="space-y-4"
      className="hover:shadow-md transition-shadow"
      description={
        <>
          {getStatusBadge(assignment.status)}
          <div className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {assignment.description}
          </div>
        </>
      }
      title={assignment.title}
    >
      {isNumber(assignment.dueDate) ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
        </div>
      ) : (
        <></>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Submissions</span>
          <span className="font-medium">
            {assignment.submitted}/{assignment.totalStudents} (
            {getProgressPercentage(
              assignment.submitted,
              assignment.totalStudents,
            )}
            %)
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{
              width: `${getProgressPercentage(assignment.submitted, assignment.totalStudents)}%`,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2 border-t">
        <div>
          <p className="text-xs text-muted-foreground">Graded</p>
          <p className="text-sm font-medium">
            {assignment.graded}/{assignment.submitted}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Avg Score</p>
          <p className="text-sm font-medium">
            {assignment.avgScore ? `${assignment.avgScore}%` : 'N/A'}
          </p>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          className="flex-1 gap-1"
          onClick={() => onViewAssignment(assignment.id)}
          size="sm"
          variant="outline"
        >
          <FileText className="h-3 w-3" />
          View
        </Button>
        <Button
          onClick={() => onEditAssignment(assignment.id)}
          size="sm"
          variant="ghost"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default AssignmentCard;
