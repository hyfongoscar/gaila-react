import React, { useCallback, useState } from 'react';

import { ArrowRight, Lightbulb, Save, Target } from 'lucide-react';
import { useMutation, useQueryClient } from 'react-query';

import Card from 'components/display/Card';
import Button from 'components/input/Button';
import TextInput from 'components/input/TextInput';

import AIChatBox from 'containers/common/AIChatBox.tsx';
import useAlert from 'containers/common/AlertProvider/useAlert';
import ResizableSidebar from 'containers/common/ResizableSidebar';

import {
  apiSaveAssignmentSubmission,
  apiViewAssignmentProgress,
} from 'api/assignment';
import type { AssignmentProgress } from 'types/assignment';

type Props = {
  assignmentProgress: AssignmentProgress;
  currentStage: AssignmentProgress['stages'][number];
};

interface Goal {
  text: string;
  category: string;
}

const GOAL_QUESTIONS = [
  {
    question: 'What is your main writing goal for this essay?',
    placeholder:
      'e.g., Create a strong thesis statement, improve paragraph transitions, develop detailed arguments...',
    category: 'Main Goals' as const,
  },
  {
    question:
      'How do you plan to use AI assistance effectively in your writing process?',
    placeholder:
      'e.g., Use AI for brainstorming ideas, checking grammar, improving sentence clarity...',
    category: 'AI usage' as const,
  },
  {
    question: 'Which writing tools will you use to improve your essay quality?',
    placeholder:
      'e.g., Use the dictionary for vocabulary, checklist for grammar review, outline feature...',
    category: 'Tool usage' as const,
  },
  {
    question:
      'What specific strategies will you implement to stay focused and organized?',
    placeholder:
      'e.g., Break writing into sections, take regular breaks, use the rubric as a guide...',
    category: 'Organize strategy' as const,
  },
];

const AssignmentGoalEditor = ({ assignmentProgress, currentStage }: Props) => {
  const queryClient = useQueryClient();
  const { alertMsg, successMsg, errorMsg } = useAlert();

  const { mutate: saveSubmission } = useMutation(apiSaveAssignmentSubmission, {
    onSuccess: async res => {
      if (res.is_final) {
        await queryClient.invalidateQueries([
          apiViewAssignmentProgress.queryKey,
        ]);
        return;
      }
      successMsg('Goals draft saved.');
    },
    onError: errorMsg,
  });

  const [responses, setResponses] = useState<{ [category: string]: string }>(
    {},
  );

  const handleResponseChange = (category: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmit = useCallback(
    (isFinal: boolean) => {
      const goals: Goal[] = GOAL_QUESTIONS.filter(q =>
        responses[q.category]?.trim(),
      ).map(q => ({
        text: responses[q.category].trim(),
        category: q.category,
      }));

      if (goals.length === 0) {
        alertMsg('Please answer at least one question to set your goals.');
        return;
      }

      // TODO: revisit goal structure first
      saveSubmission({
        assignment_id: assignmentProgress.assignment.id,
        stage_id: currentStage.id,
        content: JSON.stringify(goals),
        is_final: isFinal,
      });
    },
    [
      alertMsg,
      assignmentProgress.assignment.id,
      currentStage.id,
      responses,
      saveSubmission,
    ],
  );

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-2 flex items-center gap-2">
          <Target className="h-8 w-8 text-primary" />
          Set Your Writing Goals
        </h1>
        <p className="text-muted-foreground">
          Before you start writing {assignmentProgress.assignment.title},
          let&apos;s set some goals to guide your writing process and help you
          stay focused.
        </p>
      </div>

      <ResizableSidebar>
        {/* Main Content */}
        <div className="space-y-6">
          <Card
            classes={{
              children: 'space-y-6',
              title: 'flex items-center gap-2 -mb-2',
              header: 'mb-4',
            }}
            description="Answer the questions below to define your goals. These will appear as a checklist while you write."
            title={
              <>
                <Lightbulb className="h-5 w-5" />
                Goal Setting Questions
              </>
            }
          >
            {GOAL_QUESTIONS.map((question, index) => (
              <div className="space-y-2" key={question.category}>
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
                    handleResponseChange(question.category, e.target.value)
                  }
                  placeholder={question.placeholder}
                  rows={3}
                  value={responses[question.category] || ''}
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
              Submit and Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="col-span-2 h-fit sticky top-[80px]">
          <AIChatBox
            chatName="Goal Setting Assistant"
            description="Ask me anything about setting effective writing goals"
            firstMessage="Hi! I'm here to help you set effective writing goals. Feel free to ask me questions about setting goals, writing strategies, or how to use AI tools effectively in your essay writing process."
            placeholder="Ask about goal setting strategies..."
          />
        </div>
      </ResizableSidebar>
    </>
  );
};

export default AssignmentGoalEditor;
