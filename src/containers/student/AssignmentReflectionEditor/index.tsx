import React, { useCallback, useMemo, useState } from 'react';

import {
  ArrowRight,
  CheckCircle,
  Circle,
  FileCheck,
  MessageSquare,
  Save,
  Target,
} from 'lucide-react';

import Badge from 'components/display/Badge';
import Card from 'components/display/Card';
import Divider from 'components/display/Divider';
import LinearProgress from 'components/display/Progress/LinearProgress';
import Button from 'components/input/Button';
import TextInput from 'components/input/TextInput';

import ResizableSidebar from 'containers/common/ResizableSidebar';

import type { AssignmentProgress } from 'types/assignment';

type Props = {
  assignmentProgress: AssignmentProgress;
};

interface Goal {
  id: string;
  text: string;
  category: 'writing' | 'ai' | 'tools' | 'general';
  completed?: boolean;
}

const REFLECTION_QUESTIONS = [
  {
    id: 1,
    question: 'What writing strategies worked well for you in this essay?',
    placeholder:
      'e.g., Creating an outline first helped me stay organized, breaking it into sections made it manageable...',
  },
  {
    id: 2,
    question: 'How did AI assistance help you improve your writing?',
    placeholder:
      "e.g., AI helped me brainstorm ideas I hadn't considered, gave me feedback on clarity...",
  },
  {
    id: 3,
    question: 'What challenges did you face, and how did you overcome them?',
    placeholder:
      'e.g., I struggled with the conclusion but used the AI to explore different approaches...',
  },
  {
    id: 4,
    question: 'What would you do differently in your next essay?',
    placeholder:
      'e.g., Start earlier to allow more revision time, use the dictionary more for better vocabulary...',
  },
];

const AssignmentReflectionEditor = ({ assignmentProgress }: Props) => {
  const [reflections, setReflections] = useState<{ [key: number]: string }>({});

  const goals = useMemo(() => {
    const goalSettingStage = assignmentProgress.stages.find(
      stage => stage.stage_type === 'goal_setting',
    );
    if (!goalSettingStage?.submission) {
      return [];
    }
    return JSON.parse(goalSettingStage.submission.content || '[]') as Goal[];
  }, [assignmentProgress.stages]);

  const handleReflectionChange = (questionId: number, value: string) => {
    setReflections(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = useCallback(
    (isFinal: boolean) => {
      const answeredCount = Object.values(reflections).filter(r =>
        r?.trim(),
      ).length;

      if (answeredCount === 0) {
        alert(
          'Please answer at least one reflection question before submitting.',
        );
        return;
      }
    },
    [reflections],
  );

  const completedGoals = goals.filter(g => g.completed).length;
  const goalCompletionRate =
    goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 flex items-center gap-2">
          <FileCheck className="h-8 w-8 text-primary" />
          Essay Reflection
        </h1>
        <p className="text-muted-foreground">
          Great work on completing{' '}
          <span className="text-foreground">
            {assignmentProgress.assignment.title}
          </span>
          ! Let&apos;s reflect on your writing process.
        </p>
      </div>

      <ResizableSidebar initWidth={500} maxWidth={800} minWidth={400} reverse>
        {/* Goal Achievement */}
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
            {goals.map(goal => (
              <div className="flex items-start gap-2" key={goal.id}>
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
                  <Badge className="mt-1 text-xs" variant="outline">
                    {goal.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          {/* Reflection Questions */}
          <Card
            classes={{
              title: 'flex items-center gap-2 -mb-2',
              header: 'mb-4',
              children: 'space-y-6',
            }}
            description="Take a moment to reflect on your writing process and what you learned."
            title={
              <>
                <MessageSquare className="h-5 w-5" />
                Reflection Questions
              </>
            }
          >
            {REFLECTION_QUESTIONS.map((question, index) => (
              <div className="space-y-2" key={question.id}>
                <label className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{question.question}</span>
                </label>
                <TextInput
                  className="resize-none"
                  multiline
                  onChange={e =>
                    handleReflectionChange(question.id, e.target.value)
                  }
                  placeholder={question.placeholder}
                  rows={3}
                  value={reflections[question.id] || ''}
                />
              </div>
            ))}
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              className="gap-2"
              onClick={() => handleSubmit(false)}
              size="lg"
              variant="secondary"
            >
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button
              className="gap-2"
              onClick={() => handleSubmit(true)}
              size="lg"
            >
              Submit
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </ResizableSidebar>

      <Card
        className="bg-primary text-primary-foreground"
        classes={{ title: 'flex items-center gap-2', root: 'mt-6' }}
        title={
          <>
            <CheckCircle className="h-5 w-5" />
            Well Done!
          </>
        }
      >
        <p className="text-sm text-primary-foreground/90">
          You&apos;ve completed your essay and reflected on your writing
          process. This self-awareness will help you become a better writer.
          Keep up the great work!
        </p>
      </Card>
    </>
  );
};

export default AssignmentReflectionEditor;
