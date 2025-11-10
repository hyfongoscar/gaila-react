import React, { useMemo } from 'react';

import { useQuery } from 'react-query';

import ErrorComponent from 'components/display/ErrorComponent';
import Loading from 'components/display/Loading';

import AssignmentEssayEditor from 'containers/student/AssignmentEssayEditor';
import AssignmentGoalEditor from 'containers/student/AssignmentGoalEditor';
import AssignmentReflectionEditor from 'containers/student/AssignmentReflectionEditor';
import usePageTracking from 'containers/student/AssignmentSubmissionSwitcher/usePageTracking';

import { apiViewAssignmentProgress } from 'api/assignment';
import tuple from 'utils/types/tuple';

type Props = {
  assignmentId: number;
};

const AssignmentSubmissionSwitcher = ({ assignmentId }: Props) => {
  const {
    data: assignmentProgress,
    isLoading,
    error,
  } = useQuery(
    tuple([apiViewAssignmentProgress.queryKey, assignmentId]),
    apiViewAssignmentProgress,
  );

  usePageTracking(assignmentProgress);

  const ele = useMemo(() => {
    if (!assignmentProgress) {
      return <></>;
    }

    const currentStage =
      assignmentProgress.stages[Math.max(assignmentProgress.current_stage, 0)];
    if (!currentStage) {
      return (
        <ErrorComponent
          className="py-10"
          error="System error. Failed to get current stage."
        />
      );
    }

    if (currentStage.stage_type === 'goal_setting') {
      return (
        <AssignmentGoalEditor
          assignmentProgress={assignmentProgress}
          currentStage={currentStage}
        />
      );
    }

    if (currentStage.stage_type === 'writing') {
      return (
        <AssignmentEssayEditor
          assignmentProgress={assignmentProgress}
          currentStage={currentStage}
        />
      );
    }

    if (currentStage.stage_type === 'reflection') {
      return (
        <AssignmentReflectionEditor
          assignmentProgress={assignmentProgress}
          currentStage={currentStage}
        />
      );
    }

    return (
      <ErrorComponent className="py-10" error="System error. Invalid stage." />
    );
  }, [assignmentProgress]);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !assignmentProgress) {
    return (
      <ErrorComponent
        className="py-10"
        error={error || 'Failed to fetch assignment'}
      />
    );
  }

  return <>{ele}</>;
};

export default AssignmentSubmissionSwitcher;
