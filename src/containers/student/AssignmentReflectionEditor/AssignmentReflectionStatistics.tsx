import React, { useMemo } from 'react';

import { CheckCircle, Circle, Target } from 'lucide-react';

import Badge from 'components/display/Badge';
import Card from 'components/display/Card';
import Divider from 'components/display/Divider';
import LinearProgress from 'components/display/Progress/LinearProgress';

import type {
  AssignmentEssayContent,
  AssignmentProgress,
} from 'types/assignment';

type Props = {
  assignmentProgress: AssignmentProgress;
};

const AssignmentReflectionStatistics = ({ assignmentProgress }: Props) => {
  const goals = useMemo(() => {
    const goalSettingStage = assignmentProgress.stages.find(
      stage => stage.stage_type === 'writing',
    );
    if (!goalSettingStage?.submission) {
      return [];
    }
    const content = goalSettingStage.submission
      .content as AssignmentEssayContent;
    return content.goals;
  }, [assignmentProgress.stages]);

  const completedGoals = goals.reduce(
    (acc, g) => acc + g.goals.filter(g => g.completed).length,
    0,
  );
  const goalCompletionRate =
    goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;

  return (
    <Card
      classes={{
        title: 'flex items-center gap-2',
        children: 'space-y-4',
      }}
      description={`You achieved ${completedGoals} out of ${goals.length} goals`}
      title={
        <>
          <Target className="h-5 w-5" />
          Goal Achievement
        </>
      }
    >
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Completion Rate</span>
          <span>{Math.round(goalCompletionRate)}%</span>
        </div>
        <LinearProgress value={goalCompletionRate} variant="determinate" />
      </div>

      <Divider />

      <div className="space-y-3">
        {goals.map(group => (
          <div className="flex items-start gap-2" key={group.category}>
            <Badge className="mt-1 text-xs" variant="outline">
              {group.category}
            </Badge>
            {group.goals.map((goal, goalIndex) => (
              <div
                className="flex items-start gap-2"
                key={`${group.category}-${goalIndex}`}
              >
                {goal.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p
                    className={
                      goal.completed
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }
                  >
                    {goal.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AssignmentReflectionStatistics;
