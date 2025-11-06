import React, { useMemo } from 'react';

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useQuery } from 'react-query';

import ErrorComponent from 'components/display/ErrorComponent';
import Loading from 'components/display/Loading';

import AssignmentEssayEditor from 'containers/student/AssignmentEssayEditor';
import AssignmentGoalEditor from 'containers/student/AssignmentGoalEditor';
import AssignmentReflectionEditor from 'containers/student/AssignmentReflectionEditor';
import usePageTracking from 'containers/student/AssignmentSubmissionSwitcher/usePageTracking';

import { apiViewAssignmentProgress } from 'api/assignment';
import type { AssignmentStage } from 'types/assignment';
import tuple from 'utils/types/tuple';

type Props = {
  assignmentId: number;
};

const getStageStepLabel = (stage: AssignmentStage) => {
  switch (stage.stage_type) {
    case 'goal_setting':
      return 'Goal Setting';
    case 'writing':
      return 'Writing';
    case 'reflection':
      return 'Reflection';
    default:
      return '';
  }
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

  const inactiveStages = assignmentProgress.stages.filter(s => !s.enabled);
  const stepperActiveStep = Math.max(
    assignmentProgress.current_stage - inactiveStages.length,
    0,
  );

  return (
    <>
      <div className="bg-gray-100 -m-6 py-4 mb-4">
        <Stepper
          activeStep={stepperActiveStep}
          alternativeLabel
          className="max-w-2xl mx-auto"
        >
          {assignmentProgress.stages
            .filter(s => s.enabled)
            .map(stage => (
              <Step key={stage.stage_type}>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-label': { marginTop: '6px !important' },
                  }}
                >
                  {getStageStepLabel(stage)}
                </StepLabel>
              </Step>
            ))}
        </Stepper>
      </div>
      {ele}
    </>
  );
};

export default AssignmentSubmissionSwitcher;
