import React from 'react';

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { isNumber, isString } from 'lodash-es';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { apiViewAssignmentProgress } from 'api/assignment';
import getStageTypeLabel from 'utils/helper/getStageTypeLabel';
import tuple from 'utils/types/tuple';

const AssignmentSubmissionStepper = () => {
  const { id } = useParams();

  const assignmentId =
    isString(id) && isNumber(parseInt(id, 10)) ? parseInt(id, 10) : undefined;

  const { data: assignmentProgress } = useQuery(
    tuple([apiViewAssignmentProgress.queryKey, assignmentId as number]),
    apiViewAssignmentProgress,
    { enabled: !!isNumber(assignmentId) },
  );

  if (!assignmentProgress) {
    return <></>;
  }

  const inactiveStages =
    assignmentProgress.stages.filter(s => !s.enabled) || [];
  const stepperActiveStep = Math.max(
    assignmentProgress.current_stage - inactiveStages.length,
    0,
  );

  return (
    <Stepper activeStep={stepperActiveStep} className="basis-[400px]">
      {assignmentProgress.stages
        .filter(s => s.enabled)
        .map(stage => (
          <Step key={stage.stage_type}>
            <StepLabel>{getStageTypeLabel(stage)}</StepLabel>
          </Step>
        ))}
    </Stepper>
  );
};

export default AssignmentSubmissionStepper;
