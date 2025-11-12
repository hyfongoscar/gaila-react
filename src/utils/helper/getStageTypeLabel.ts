import type { AssignmentStage } from 'types/assignment';

const getStageTypeLabel = (stage: Partial<AssignmentStage>) => {
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

export default getStageTypeLabel;
